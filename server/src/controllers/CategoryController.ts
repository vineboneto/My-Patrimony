import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default class CategoryController {
  async index(req: Request, res: Response) {
    const categories = await prisma.category.findMany();
    return res.json(categories);
  }

  async create(req: Request, res: Response) {
    const { name } = req.body;

    await prisma.category.create({
      data: {
        name: name,
      },
    });
  }
}
