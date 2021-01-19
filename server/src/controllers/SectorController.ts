import { PrismaClient } from "@prisma/client";
import { Response, Request } from "express";

const prisma = new PrismaClient();

export default class SectorController {
  async index(req: Request, res: Response) {
    const sectors = await prisma.sector.findMany({});
    return res.json(sectors);
  }

  async create(req: Request, res: Response) {
    const { id, name } = req.body;

    try {
      if (id) {
        await prisma.sector.update({
          data: {
            name: name,
          },
          where: {
            id: id,
          },
        });
      } else {
        await prisma.sector.create({
          data: {
            name: name,
          },
        });
      }
      return res.status(201).send();
    } catch (err) {
      return res.status(400).json({
        error: err,
      });
    }
  }
}
