import { PrismaClient } from '@prisma/client';
import { Response, Request } from 'express';

const prisma = new PrismaClient();

export default class SectorController {
	async index(req: Request, res: Response) {
		const sectors = prisma.sector.findMany();
		return res.json(sectors);
	}

	async create(req: Request, res: Response) {
		const { name } = req.body;

		try {
			await prisma.sector.create({
				data: {
					name: name,
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
