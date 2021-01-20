import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export default class OwnerController {
  async index(req: Request, res: Response) {
    const owners = await prisma.owner.findMany({});
    return res.json(owners);
  }

  async createOrUpdate(req: Request, res: Response) {
    const { id, name, sectorId } = req.body;
    try {
      await prisma.owner.upsert({
        create: {
          name: name,
          Sector: {
            connect: {
              id: sectorId,
            },
          },
        },
        update: {
          name: name,
          Sector: {
            connect: {
              id: sectorId,
            },
          },
        },
        where: { id: id || -1 },
      });

      return res.status(201).send();
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
      await prisma.owner.delete({
        where: { id: Number(id) },
      });
      return res.status(201).send();
    } catch (err) {
      return res.status(400).json({
        error: err,
      });
    }
  }
}
