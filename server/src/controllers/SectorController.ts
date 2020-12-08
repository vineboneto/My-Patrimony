import { Request, Response } from 'express'

import db from '../database/connection'

export default class SectorController {
    async index(req: Request, res: Response) {
        const sectors = await db('sectors').select('*').from('sectors')
        return res.json(sectors)
    }

    async create(req:Request, res: Response) {

        const { name } = req.body
        
        const trx = await db.transaction()

        try {
            await trx('sectors').insert({ name })    

            await trx.commit();

            return res.status(201).send();
        } catch(err) {
            await trx.rollback()
            return res.status(400).json({
                error: err
            })
        }
    }
}