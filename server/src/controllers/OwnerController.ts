import { Response, Request } from 'express';

import db from '../database/connection';

export default class OwnerController {
    async create(req: Request, res: Response) {

        const { name, sector_id } = req.body

        const trx = await db.transaction()

        try {
            const insertedOwnerId = await trx('owners').insert({ name, sector_id })

            trx.commit()
            // Captura id inserido
            const owner_id = insertedOwnerId[0]

            // const insertedComputerId = await trx('computers').insert 



            return res.status(201).send()
        } catch(err) {
            await trx.rollback()
            return res.status(400).json({
                error: err
            })
        }
    }
}