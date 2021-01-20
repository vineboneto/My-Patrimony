import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

interface Owner {
  name: string;
  sectorId: number;
}

export default class OwnerController {
  async index(req: Request, res: Response) {
    const owners = await prisma.owner.findMany({});
    return res.json(owners);
  }

  async createOrUpdate(req: Request, res: Response) {
    const owner = req.body;
    if (req.params.id) owner.id = Number(req.params.id);

    const newOwner = {
      name: owner.name,
      Sector: {
        connect: {
          id: owner.sectorId,
        },
      },
    };

    try {
      await prisma.owner.upsert({
        create: newOwner,
        update: newOwner,
        where: { id: owner.id || -1 },
      });

      return res.status(201).send();
    } catch (err) {
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
      return res.status(401).json({
        error: err,
      });
    }
  }
}
