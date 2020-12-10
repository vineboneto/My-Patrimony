import { Response, Request } from 'express';

import db from '../database/connection';

interface ipItem {
    ip: string,
    mask: string
    gateway: string
}

export default class OwnerController {
    async create(req: Request, res: Response) {

        const { name, sector_id, patrimony, description, model, ips } = req.body

        console.log(ips)

        const trx = await db.transaction()

        try {
            const insertedOwnerId = await trx('owners').insert({ name, sector_id })

            // Captura id inserido
            const owner_id = insertedOwnerId[0]

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

function intToIp(ip: string) {
    const ipArray = ip.split('.')
    const newIp = ipArray[0] + ipArray[1] + ipArray[2] + ipArray[3]
    return parseInt(newIp)
}