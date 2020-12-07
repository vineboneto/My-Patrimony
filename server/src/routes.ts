import express, { Response } from 'express'
import SectorController from './controllers/SectorController'

const routes = express.Router()
const sectorController = new SectorController

routes.get('/sector', sectorController.index)

export default routes