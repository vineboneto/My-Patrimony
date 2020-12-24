import { Response, Request } from 'express'

import db from '../database/connection'

export default class PatrimonyController {
    async listComputer(req: Request, res: Response) {
        const computerList = await db('owners')
        .select('owners.id AS owners_id', 'owners.name',
            'computers.id AS computers_id', 'computers.patrimony', 'computers.model', 'computers.description')
        .from('owners')
        .join('computers', 'owners.id', '=', 'computers.owner_id')
    
        console.log(computerList)
        return res.json(computerList)
    }
}