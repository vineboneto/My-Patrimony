import { Response, Request } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default class PatrimonyController {
  async index(req: Request, res: Response) {
    const patrimonies = await prisma.patrimony.findMany();
    return res.json(patrimonies);
  }
}
