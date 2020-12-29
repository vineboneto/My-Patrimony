import express from 'express'

import OwnerController from './controllers/OwnerController'
import SectorController from './controllers/SectorController'
import TypeController from './controllers/TypeController'

const routes = express.Router()
const ownerController = new OwnerController
const sectorController = new SectorController
const typeController = new TypeController

routes.get('/owners', ownerController.index)
routes.post('/owners', ownerController.create)
routes.get('/sectors', sectorController.index)
routes.post('/sectors', sectorController.create)
routes.get('/types', typeController.index)
routes.post('/types', typeController.create)

export default routes