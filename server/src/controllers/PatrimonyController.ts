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
        const { id, patrimony, model, description, ownerId, categoryId, ips } = req.body
        console.log(req.body)

        const trx = await db.transaction()

        try {

            if (!id) {
                const insertedPatrimony = await trx('patrimonies').insert({
                    patrimony,
                    model,
                    description,
                    owner_id: ownerId,
                    type_id: categoryId
                })

                let existsIps 
                ips.forEach((ip: any) => {
                    if (ip.ip === '') existsIps = false
                    else existsIps = true
                })
                console.log('ExitsIps: ' + existsIps)

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
            }
            else {
                console.log('id definido ' +  id + ' Update')
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

    async getById(req: Request, res: Response) {
        const { id } = req.params

        const patrimony = await db('patrimonies')
            .select('patrimonies.*', 'owners.sector_id AS sector_id',
                db.raw('GROUP_CONCAT( JSON_ARRAY( ips.id, ips.ip, ips.mask, ips.gateway ) ) AS ips'))
            .from('patrimonies')
            .join('owners', 'patrimonies.owner_id', '=', 'owners.id')
            .join('sectors', 'owners.sector_id', '=', 'sectors.id')
            .leftJoin('ips', 'ips.patrimony_id', '=', 'patrimonies.id')
            .where('patrimonies.id', '=', parseInt(id))
            .groupBy('patrimonies.id')
        const patrimony_ = patrimony.map((p) => {
            return {
                ...p,
                ips: JSON.parse("[" + p.ips + "]")
            }
        })
        return res.json(patrimony_)
    }

    async index(req: Request, res: Response) {

        const { page, limit } = req.query
        const page_ = page ? parseInt(page.toString()) : 0
        const limit_ = limit ? parseInt(limit.toString()) : 0

        const patrimonies = await db('patrimonies')
            .select('patrimonies.id', 'patrimonies.patrimony', 'patrimonies.model', 'owners.name AS ownerName',
                'sectors.name AS sectorName', 'types.name AS typeName',
                db.raw('REPLACE (GROUP_CONCAT(ips.ip), ",", ", ") AS ips'))
            .from('patrimonies')
            .join('owners', 'patrimonies.owner_id', '=', 'owners.id')
            .join('types', 'patrimonies.type_id', '=', 'types.id')
            .join('sectors', 'owners.sector_id', '=', 'sectors.id')
            .leftJoin('ips', 'ips.patrimony_id', '=', 'patrimonies.id')
            .groupBy('patrimonies.id')
            .orderBy('patrimonies.id').limit(limit_).offset((page_ * limit_) - limit_)

        const totalPatrimonies = await db('patrimonies')
            .count({ total: 'patrimonies.id'})
            .from('patrimonies')

        res.header('x-total-count', totalPatrimonies[0].total?.toString() || '')
        
        return res.json(patrimonies)
        
    }
}