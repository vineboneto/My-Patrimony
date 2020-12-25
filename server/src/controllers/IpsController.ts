import { Request, Response } from 'express'
import db from '../database/connection'

// interface Ip {
//     id: number
//     ip: string
//     mask: string
//     gateway: string
// }

export default class IpsController {
    async getByComputerId(req: Request, res: Response) {
        // const filter  = req.query
        // const computer_id = filter.computer_ip as string

        const ipsComputer = await db('ips')
            .select('ips.id AS ip_id', 'ips.computer_id AS computer_id', 'ips.ip AS computer_ip', 'ips.mask AS computer_mask', 'ips.gateway AS computer_gateway')
            .from('ips')
        
        return res.json(ipsComputer)
    }
}