import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default class CategoryController {
  async index(req: Request, res: Response) {
    const categories = await prisma.category.findMany({});
    return res.json(categories);
  }

  async create(req: Request, res: Response) {
    const { id, name } = req.body;

    try {
      if (id) {
        await prisma.category.update({
          data: {
            name: name,
          },
          where: {
            id: id,
          },
        });
      } else {
        await prisma.category.create({
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
