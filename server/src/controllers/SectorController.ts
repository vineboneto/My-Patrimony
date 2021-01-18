import { PrismaClient } from '@prisma/client';
import { Response, Request } from 'express';

const prisma = new PrismaClient();

export default class SectorController {
	async index(req: Request, res: Response) {
		const sectors = prisma.sector.findMany();
		return res.json(sectors);
	}
}
