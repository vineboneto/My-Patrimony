import { Request, Response } from 'express'

import db from '../database/connection'

export default class OwnerController {
    async index(req: Request, res: Response) {
        const owners = await db('sectors').select('*').from('owners')
        return res.json(owners)
    }

    async create(req:Request, res: Response) {

        const { name, sector_id } = req.body
        
        const trx = await db.transaction()

        try {
            await trx('owners').insert({ name, sector_id })    

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