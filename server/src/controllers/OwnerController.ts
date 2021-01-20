import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export default class OwnerController {
  async index(req: Request, res: Response) {
    const owners = await prisma.owner.findMany({});
    return res.json(owners);
  }

  async createOrUpdate(req: Request, res: Response) {
    const owner = req.body;
    if (req.params.id) owner.id = req.params.id;
    try {
      await prisma.owner.upsert({
        create: {
          name: owner.name,
          Sector: {
            connect: {
              id: owner.sectorId,
            },
          },
        },
        update: {
          name: owner.name,
          Sector: {
            connect: {
              id: owner.sectorId,
            },
          },
        },
        where: { id: Number(owner.id) || -1 },
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
