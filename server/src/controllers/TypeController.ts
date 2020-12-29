import { Response, Request } from 'express'
import db from '../database/connection'

export default class TypeController {
    async create(req: Request, res: Response) {
        const { name } = req.body

        const trx = await db.transaction()

        try {
            await trx('types').insert({ name })

            await trx.commit()

            return res.status(201).send()

        } catch (err) {
            await trx.rollback()
            
            return res.status(400).json({
                error: err
            })
        } 
    }

    async index(req: Request, res: Response) {
        const types = await db('types').select('*').from('types')

        return res.json(types)
    }

}