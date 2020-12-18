import { Response, Request } from 'express'

import db from '../database/connection'

interface ipItem {
    ip: string,
    mask: string
    gateway: string
}

export default class PrinterController {
    async create(req: Request, res: Response) {
        const { patrimony, model, description, ips, owner_id } = req.body

        const trx = await db.transaction()

        try {
            const insertedPrinter = await trx('printers').insert({
                patrimony,
                model,
                description,
                owner_id
            })

            
            const printer_id = insertedPrinter[0]

            const classIps = ips.map((ipItem: ipItem) => {
                return {
                    ip: ipItem.ip,
                    mask: ipItem.mask,
                    gateway: ipItem.gateway,
                    printer_id
                }
            })

            await trx('ips').insert(classIps)

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