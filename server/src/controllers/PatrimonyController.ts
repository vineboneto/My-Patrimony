import { Response, Request } from 'express'

import db from '../database/connection'

interface Ips {
    id?: number
    ip: string
    mask: string
    gateway: string
}

export default class PatrimonyController {
    async create(req: Request, res: Response) {
        const { patrimony, model, description, owner_id, type_id, ips } = req.body

        const trx = await db.transaction()

        try {
            const insertedPatrimony = await trx('patrimonies').insert({
                patrimony,
                model,
                description,
                owner_id,
                type_id
            })

           
            if (ips) {
                const patrimony_id = insertedPatrimony[0]
                const classIps = ips.map((ip: Ips) => {
                    return {
                        ip: ip.ip,
                        mask: ip.mask,
                        gateway: ip.gateway,
                        patrimony_id
                    }
                })
                
                await trx('ips').insert(classIps)
            }

            
            await trx.commit()

            return res.status(201).send()

        } catch (err) {
            await trx.rollback()

            return res.status(400).send({
                error: err
            })
        }
    }

    async index(req: Request, res: Response) {
        const patrimonies = await db('patrimonies').select('*').from('patrimonies')

        const ips = await db('ips').select('*').from('ips')


        const listPatrimonies = patrimonies.map((patrimony) => {
            return {
                id: patrimony.id,
                patrimony: patrimony.patrimony,
                model: patrimony.model,
                description: patrimony.description,
                owner_id: patrimony.owner_id,
                type_id: patrimony.type_id,
                ips: [] as any
            }
        })

        listPatrimonies.forEach((patrimony) => {
            ips.forEach((ip) => {
                if (ip.patrimony_id === patrimony.id) {
                    patrimony.ips.push(
                        [
                            ip.id,
                            ip.ip,
                            ip.mask,
                            ip.gateway
                        ]
                    )
                }    
            })
        })
        
        return res.json(listPatrimonies)
    }
}