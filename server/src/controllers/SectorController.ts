import { Request, Response } from 'express'

import db from '../database/connection'

interface SectorItem {
    name: string
}

export default class SectorController {
    async index(req: Request, res: Response) {
        return res.status(200).json({ message: 'deu boa' })
    }
}