import express, { Response } from 'express'

import OwnerController from './controllers/OwnerController'
import SectorController from './controllers/SectorController'
import ComputerController from './controllers/ComputerController'
import MonitorController from './controllers/MonitorController'
import PrinterController from './controllers/PrinterController'

const routes = express.Router()
const ownerController = new OwnerController
const sectorController = new SectorController
const computerController = new ComputerController
const monitorController = new MonitorController
const printerController = new PrinterController

routes.get('/owners', ownerController.index)
routes.post('/owners', ownerController.create)
routes.get('/sectors', sectorController.index)
routes.post('/sectors', sectorController.create)
routes.post('/computers', computerController.create)
routes.post('/monitors', monitorController.create)
routes.post('/printers', printerController.create)

export default routes