import express, { Response } from 'express'
import ComputerController from './controllers/ComputerController'
import SectorController from './controllers/SectorController'

const routes = express.Router()
const sectorController = new SectorController
const computerController = new ComputerController


routes.get('/sectors', sectorController.index)
routes.post('/sectors', sectorController.create)
routes.post('/owners', computerController.create)

export default routes