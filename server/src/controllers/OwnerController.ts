import { PrismaClient, prismaVersion } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export default class OwnerController {
	async index(req: Request, res: Response) {
		const owners = prisma.owner.findMany();
		return res.json(owners);
	}
}
