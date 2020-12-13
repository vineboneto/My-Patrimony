import { Response, Request } from 'express'
import { convertInchToNumber } from '../utils/convertToNumber'

import db from '../database/connection'

interface MonitorItem {
    patrimony: string
    model: string
    inch: string
    description: string
}

export default class MonitorController {
    async create(req: Request, res: Response) {

        const { owner_id, monitorItems } = req.body

        const updateMonitorItems = monitorItems.map((monitorItem: MonitorItem) => {
            return {
                patrimony: monitorItem.patrimony,
                description: monitorItem.description,
                model: monitorItem.model,
                inch: convertInchToNumber(monitorItem.inch)
            }
        })

        console.log(monitorItems)
        console.log(updateMonitorItems)

        const trx = await db.transaction()

        try {

            return res.status(201).send()
        } catch (err) {
            await trx.rollback()
            return res.status(400).json({
                error: err
            })
        }
    }
}

