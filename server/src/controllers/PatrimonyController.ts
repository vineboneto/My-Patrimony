import { Response, Request } from 'express'

import db from '../database/connection'

interface Computer {
    owner_id: number
    owner_name: string
    sector_id: number
    sector_name: string
    computer_id: number
    patrimony: string
    model: string
    description: string
    ips: Array<[
        id: number,
        ip: string,
        mask: string,
        gateway: string
    ]>
}



export default class PatrimonyController {
    async listComputer(req: Request, res: Response) {

        
        const computerList = await db('owners')
            .select('owners.id AS owner_id', 'owners.name AS owner_name',
                'sectors.id AS sector_id', 'sectors.name AS sector_name',
                'computers.id AS computer_id', 'computers.patrimony', 'computers.model', 'computers.description')
            .from('owners')
            .join('computers', 'owners.id', '=', 'computers.owner_id')
            .join('sectors', 'sectors.id', '=', 'owners.sector_id')

        const ipList = await db('ips')
            .select('ips.id', 'ips.computer_id', 'ips.ip',
             'ips.mask', 'ips.gateway')
            .from('ips')
            .join('computers', 'computers.id', '=', 'ips.computer_id')

        const newComputerList: Array<Computer> = computerList.map((computer, index) => {
            return {
                owner_id: computer.owner_id,
                owner_name: computer.owner_name,
                sector_id: computer.sector_id,
                sector_name: computer.sector_name,
                computer_id: computer.computer_id,
                patrimony: computer.patrimony,
                description: computer.description,
                model: computer.model,
                ips: []
            }
        })

        newComputerList.forEach((computer, index) => {

            ipList.forEach((ip, index) => {
                if (computer.computer_id === ip.computer_id){
                    computer.ips.push(
                        [
                           ip.id,
                           ip.ip,
                           ip.mask,
                           ip.gateway,
                        ]
                    )
                }
            })
            
        })
        
        return res.json(newComputerList)
    }
}