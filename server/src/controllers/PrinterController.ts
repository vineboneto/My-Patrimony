import { Response, Request } from 'express'

import db from '../database/connection'

export default class PrinterController {
    async create(req: Request, res: Response) {
        const { patrimony, model, description, ipItems, owner_id } = req.body

        const trx = await db.transaction()

        try {
            await trx('printers').insert({
                patrimony,
                model,
                description,
                owner_id
            })

            await trx.commit()
            
            return res.status(201).send()
        } catch (err) {
            await trx.rollback()
            return res.status(400).json({
                error: err
            })
        }
    }
}