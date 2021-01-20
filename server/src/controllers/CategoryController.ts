import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default class CategoryController {
  async index(req: Request, res: Response) {
    const categories = await prisma.category.findMany({});
    return res.json(categories);
  }

  async createOrUpdate(req: Request, res: Response) {
    const category = req.body;
    if (req.params.id) category.id = Number(req.params.id);
    try {
      await prisma.category.upsert({
        create: { name: category.name },
        update: { name: category.name },
        where: { id: category.id || -1 },
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
      await prisma.category.delete({
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
