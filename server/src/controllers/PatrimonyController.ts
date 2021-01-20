import { Response, Request } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface Ip {
  id?: number;
  ip: string;
  mask: string;
  gateway: string;
  patrimonyId?: number;
}

export default class PatrimonyController {
  async index(req: Request, res: Response) {
    const patrimonies = await prisma.patrimony.findMany({
      include: {
        Ip: true,
      },
    });
    return res.json(patrimonies);
  }

  async create(req: Request, res: Response) {
    const {
      id,
      patrimony,
      model,
      description,
      ownerId,
      categoryId,
      ips,
    } = req.body;

    try {
      await prisma.patrimony.upsert({
        create: {
          number: patrimony,
          model: model,
          description: description,
          Category: {
            connect: {
              id: categoryId,
            },
          },
          Owner: {
            connect: {
              id: ownerId,
            },
          },
        },
        update: {
          number: patrimony,
          model: model,
          description: description,
          Category: {
            connect: {
              id: categoryId,
            },
          },
          Owner: {
            connect: {
              id: ownerId,
            },
          },
        },
        where: { id: id || -1 },
      });

      const newIps = ips.map((ip: Ip) =>
        prisma.ip.upsert({
          where: { id: ip.id },
          update: {
            ip: ip.ip,
            mask: ip.mask,
            gateway: ip.gateway,
            Patrimony: {
              connect: {
                id: id,
              },
            },
          },
          create: {
            ip: ip.ip,
            mask: ip.mask,
            gateway: ip.gateway,
            Patrimony: {
              connect: {
                id: id,
              },
            },
          },
        })
      );

      Promise.all(newIps);

      return res.status(201).send();
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        error: err,
      });
    }
  }
}
