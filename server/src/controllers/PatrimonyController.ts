import { Response, Request } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface Ip {
  id?: number;
  ip: string;
  mask: string;
  gateway: string;
}

export default class PatrimonyController {
  async index(req: Request, res: Response) {
    const { page, limit } = req.query;
    const patrimonies = await prisma.patrimony.findMany({
      skip: Number(page) * Number(limit) - Number(limit),
      take: Number(limit),
      select: {
        id: true,
        number: true,
        model: true,
        description: true,
        Category: true,
        Owner: {
          select: {
            id: true,
            name: true,
            Sector: true,
          },
        },
        Ip: {
          select: {
            id: true,
            ip: true,
            mask: true,
            gateway: true,
          },
        },
      },
    });
    const total = await prisma.patrimony.count();
    res.setHeader("x-total-patrimonies", total);
    return res.json(patrimonies);
  }

  async getById(req: Request, res: Response) {
    const { id } = req.params;
    const patrimony = await prisma.patrimony.findUnique({
      where: { id: Number(id) },
      select: {
        id: true,
        number: true,
        model: true,
        description: true,
        categoryId: true,
        Owner: true,
        Ip: {
          select: {
            id: true,
            ip: true,
            mask: true,
            gateway: true,
          },
        },
      },
    });
    return res.json(patrimony);
  }

  async createOrUpdate(req: Request, res: Response) {
    const patrimony = req.body;
    if (req.params.id) patrimony.id = Number(req.params.id);

    const newPatrimony = {
      number: patrimony.patrimony,
      model: patrimony.model,
      description: patrimony.description,
      Category: {
        connect: {
          id: patrimony.categoryId,
        },
      },
      Owner: {
        connect: {
          id: patrimony.ownerId,
        },
      },
    };

    try {
      const createdPatrimony = await prisma.patrimony.upsert({
        create: newPatrimony,
        update: newPatrimony,
        where: { id: patrimony.id || -1 },
      });
      if (!patrimony.id) patrimony.id = createdPatrimony.id;

      const newIps = patrimony.ips.map((ip: Ip) =>
        prisma.ip.upsert({
          where: { id: ip.id || -1 },
          update: {
            ip: ip.ip,
            mask: ip.mask,
            gateway: ip.gateway,
            Patrimony: {
              connect: {
                id: patrimony.id,
              },
            },
          },
          create: {
            ip: ip.ip,
            mask: ip.mask,
            gateway: ip.gateway,
            Patrimony: {
              connect: {
                id: patrimony.id,
              },
            },
          },
        })
      );

      Promise.all(newIps);

      return res.status(204).send();
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        error: err,
      });
    }
  }

  async updateOwnerId(req: Request, res: Response) {
    const id = Number(req.params.id);
    const patrimony = req.body;

    try {
      await prisma.patrimony.update({
        data: {
          Owner: {
            connect: {
              id: patrimony.ownerId,
            },
          },
        },
        where: { id: id },
      });
      return res.status(204).send();
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        error: err,
      });
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    try {
      await prisma.ip.deleteMany({
        where: { patrimonyId: Number(id) },
      });

      await prisma.patrimony.delete({
        where: {
          id: Number(id),
        },
      });
      return res.status(204).send();
    } catch (err) {
      return res.status(400).json({
        error: err,
      });
    }
  }

  async getByOwnerId(req: Request, res: Response) {
    const { id } = req.params;
    const { patrimonyNumber } = req.body;
    let patrimonies;
    const selectParams = {
      id: true,
      model: true,
      number: true,
      Category: true,
    };

    try {
      if (id && !patrimonyNumber) {
        patrimonies = await prisma.patrimony.findMany({
          where: {
            Owner: {
              id: Number(id),
            },
          },
          select: selectParams,
        });
      } else {
        patrimonies = await prisma.patrimony.findMany({
          where: {
            number: patrimonyNumber,
            Owner: {
              id: Number(id),
            },
          },
          select: selectParams,
        });
      }
      return res.status(200).json(patrimonies);
    } catch (err) {
      return res.status(400).json({
        error: err,
      });
    }
  }
}
