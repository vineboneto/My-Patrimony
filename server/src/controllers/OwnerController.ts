import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export default class OwnerController {
  async index(req: Request, res: Response) {
    const owners = prisma.owner.findMany();
    return res.json(owners);
  }

  async create(req: Request, res: Response) {
    const { name, sectorId } = req.body;
    console.log(name);
    console.log(sectorId);
    try {
      await prisma.owner.create({
        data: {
          name: name,
          Sector: {
            connect: {
              id: sectorId,
            },
          },
        },
      });
      return res.status(201).send();
    } catch (err) {
      return res.status(400).json({
        error: err,
      });
    }
  }
}
