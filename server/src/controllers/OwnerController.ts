import { Response, Request } from 'express';

import db from '../database/connection';

export default class OwnerController {
    async create(req: Request, res: Response) {

        const { name, sector_id, patrimony, description, model } = req.body
        console.log(name)
        console.log(sector_id)
        console.log(patrimony)
        console.log(description)
        console.log(model)

        const trx = await db.transaction()

        try {
            const insertedOwnerId = await trx('owners').insert({ name, sector_id })

            // Captura id inserido
            const owner_id = insertedOwnerId[0]
            console.log(owner_id)

            await trx('computers').insert({ patrimony, description, model, owner_id })

            await trx.commit()

            return res.status(201).send()
        } catch(err) {
            await trx.rollback()
            return res.status(400).json({
                error: err
            })
        }
    }
}