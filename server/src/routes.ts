import express, { Response } from 'express'
import ComputerController from './controllers/ComputerController'
import SectorController from './controllers/SectorController'
import MonitorController from './controllers/MonitorController'

const routes = express.Router()
const sectorController = new SectorController
const computerController = new ComputerController
const monitorController = new MonitorController


routes.get('/sectors', sectorController.index)
routes.post('/sectors', sectorController.create)
routes.post('/owners', computerController.create)
routes.post('/monitors', monitorController.create)

export default routes