import { PrismaClient } from "@prisma/client";
import { Response, Request } from "express";

const prisma = new PrismaClient();

export default class SectorController {
  async index(req: Request, res: Response) {
    const sectors = await prisma.sector.findMany({});
    return res.json(sectors);
  }

  async createOrUpdate(req: Request, res: Response) {
    const { id, name } = req.body;

    try {
      await prisma.sector.upsert({
        create: { name: name },
        update: { name: name },
        where: { id: id || -1 },
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
      await prisma.sector.delete({
        where: { id: Number(id) },
      });
      return res.status(201).send();
    } catch (err) {
      return res.status(201).json({
        error: err,
      });
    }
  }
}
