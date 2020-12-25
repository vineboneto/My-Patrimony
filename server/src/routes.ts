import express, { Response } from 'express'

import OwnerController from './controllers/OwnerController'
import SectorController from './controllers/SectorController'
import ComputerController from './controllers/ComputerController'
import MonitorController from './controllers/MonitorController'
import PrinterController from './controllers/PrinterController'
import StabiliserController from './controllers/StabiliserController'
import PatrimonyController from './controllers/PatrimonyController'
import IpsController from './controllers/IpsController'

const routes = express.Router()
const ownerController = new OwnerController
const sectorController = new SectorController
const computerController = new ComputerController
const monitorController = new MonitorController
const printerController = new PrinterController
const stabiliserController = new StabiliserController
const patrimonyController = new PatrimonyController
const ipsController = new IpsController

routes.get('/owners', ownerController.index)
routes.post('/owners', ownerController.create)
routes.get('/sectors', sectorController.index)
routes.post('/sectors', sectorController.create)
routes.post('/computers', computerController.create)
routes.post('/monitors', monitorController.create)
routes.post('/printers', printerController.create)
routes.post('/stabilisers', stabiliserController.create)
routes.get('/computer-list', patrimonyController.listComputer)
routes.get('/computer-ips', ipsController.getByComputerId)

export default routes