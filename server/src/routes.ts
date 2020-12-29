import express from 'express'

import OwnerController from './controllers/OwnerController'
import SectorController from './controllers/SectorController'

const routes = express.Router()
const ownerController = new OwnerController
const sectorController = new SectorController


routes.get('/owners', ownerController.index)
routes.post('/owners', ownerController.create)
routes.get('/sectors', sectorController.index)
routes.post('/sectors', sectorController.create)

export default routes