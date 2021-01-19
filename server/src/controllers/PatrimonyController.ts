import { Response, Request } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default class PatrimonyController {
  async index(req: Request, res: Response) {
    const patrimonies = await prisma.patrimony.findMany({
      include: {
        Ip: true,
      },
    });
    return res.json(patrimonies);
  }

  async create(req: Request, res: Response) {
    const {
      patrimony,
      model,
      description,
      ownerId,
      categoryId,
      ips,
    } = req.body;

    try {
      await prisma.patrimony.create({
        data: {
          number: patrimony,
          model: model,
          description: description,
          Category: {
            connect: {
              id: categoryId,
            },
          },
          Owner: {
            connect: {
              id: ownerId,
            },
          },
          Ip: {
            create: [...ips],
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
