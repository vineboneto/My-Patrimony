import { Response, Request } from 'express';

import db from '../database/connection';

interface ipItem {
    ip: string,
    mask: string
    gateway: string
}

export default class ComputerController {
    async create(req: Request, res: Response) {

        const { patrimony, description, model, owner_id,  ips } = req.body

        const trx = await db.transaction()

        try {  
            
            const insertedComputerId = await trx('computers').insert({ patrimony, description, model, owner_id })
            

            // Captura id inserido
            const computer_id = insertedComputerId[0]

            const classIps = ips.map((ipItem: ipItem) => {
                return {
                    ip: ipItem.ip,
                    mask: ipItem.mask,
                    gateway: ipItem.gateway,
                    computer_id
                }
            })

            console.log(classIps)

            await trx('ips').insert(classIps)

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

