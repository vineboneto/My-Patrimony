import { Response, Request } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface Ip {
  id?: number;
  ip: string;
  mask: string;
  gateway: string;
  patrimonyId?: number;
}

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
      id,
      patrimony,
      model,
      description,
      ownerId,
      categoryId,
      ips,
    } = req.body;
    console.log(req.body);

    try {
      if (id) {
        const test = await prisma.patrimony.update({
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
            Ip: {},
          },

          where: {
            id: id,
          },
        });
        console.log(ips);
        const upsertManyIps = ips.map((ip: Ip) => {
          prisma.ip.upsert({
            where: { id: ip.id },
            update: {
              ...ip,
            },
            create: {
              ...ip,
              Patrimony: {
                connect: {
                  id: id,
                },
              },
            },
          });
        });

        Promise.all(upsertManyIps);
      } else {
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
      }
      return res.status(201).send();
    } catch (err) {
      return res.status(400).json({
        error: err,
      });
    }
  }
}
