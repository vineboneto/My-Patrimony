import { PrismaClient } from "@prisma/client";
import { Response, Request } from "express";

const prisma = new PrismaClient();

export default class SectorController {
  async index(req: Request, res: Response) {
    const sectors = await prisma.sector.findMany({});
    return res.json(sectors);
  }

  async createOrUpdate(req: Request, res: Response) {
    const sector = req.body;
    if (req.params.id) sector.id = Number(req.params.id);

    try {
      await prisma.sector.upsert({
        create: { name: sector.name },
        update: { name: sector.name },
        where: { id: sector.id || -1 },
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
