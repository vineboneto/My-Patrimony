import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default class CategoryController {
  async index(req: Request, res: Response) {
    const categories = await prisma.category.findMany({});
    return res.json(categories);
  }

  async createOrUpdate(req: Request, res: Response) {
    const { id, name } = req.body;
    try {
      await prisma.category.upsert({
        create: {
          name: name,
        },
        update: {
          name: name,
        },
        where: { id: id || -1 },
      });
      return res.status(201).send();
    } catch (err) {
      return res.status(400).json({
        error: err,
      });
    }
  }
}
