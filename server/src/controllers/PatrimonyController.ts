import { Response, Request } from 'express'

import db from '../database/connection'

interface Ips {
    id?: number
    ip: string
    mask: string
    gateway: string
}

interface Patrimony {
    id: number
    patrimony: string
    model: string
    description: string
    owner_id?: number
    owner_name?: string
    sector_id?: number
    sector_name?: string
    type_id?: number
    type_name?: string
    ips: Array<Ips>
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

            let existsIps 
            ips.forEach((ip: any) => {
                if (ip.ip === '') existsIps = false
                else existsIps = true
            })

            if (existsIps) {
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

    async getById(req:Request, res: Response) {
        const { id } = req.params

        const patrimony = await db('patrimonies')
            .select('patrimonies.*', 'owners.sector_id')
            .from('patrimonies')
            .join('owners', 'patrimonies.owner_id', '=', 'owners.id')
            .join('sectors', 'owners.sector_id', '=', 'sectors.id')
            .where('patrimonies.id', '=', parseInt(id))
            
        const ip = await db('ips')
            .select('*')
            .from('ips')
            .where('ips.patrimony_id', '=', parseInt(id))
        
        const updatedPatrimony = patrimony.map((patrimony: any) => {
            return {
                id: patrimony.id,
                patrimony: patrimony.patrimony,
                model: patrimony.model,
                description: patrimony.description,
                owner_id: patrimony.owner_id,
                type_id: patrimony.type_id,
                sector_id: patrimony.sector_id,
                ips: [] as any
            }
        }) 

        // Add ips
        if (ip) {
            updatedPatrimony.forEach((patrimony) => {
                ip.forEach((ip) => {
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
        }

        return res.json(updatedPatrimony[0])
    }

    async index(req: Request, res: Response) {
        const patrimonies = await db('patrimonies')
            .select('patrimonies.id', 'patrimonies.patrimony', 'patrimonies.model', 'owners.name AS owner_name',
            'sectors.name AS sector_name', 'types.name AS type_name')
            .from('patrimonies')
            .join('owners', 'patrimonies.owner_id', '=', 'owners.id')
            .join('types', 'patrimonies.type_id', '=', 'types.id')
            .join('sectors', 'owners.sector_id', '=', 'sectors.id')

        const ips = await db('ips').select('*').from('ips')

        const listPatrimonies = patrimonies.map((patrimony) => {
            return {
                id: patrimony.id,
                patrimony: patrimony.patrimony,
                model: patrimony.model,
                owner_name: patrimony.owner_name,
                sector_name: patrimony.sector_name,
                type_name: patrimony.type_name,
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