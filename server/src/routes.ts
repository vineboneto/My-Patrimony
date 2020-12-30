import express from 'express'

import OwnerController from './controllers/OwnerController'
import PatrimonyController from './controllers/PatrimonyController'
import SectorController from './controllers/SectorController'
import TypeController from './controllers/TypeController'

const routes = express.Router()
const ownerController = new OwnerController
const sectorController = new SectorController
const typeController = new TypeController
const patrimonyController = new PatrimonyController

routes.get('/owners', ownerController.index)
routes.post('/owners', ownerController.create)
routes.get('/sectors', sectorController.index)
routes.post('/sectors', sectorController.create)
routes.get('/types', typeController.index)
routes.post('/types', typeController.create)
routes.get('/patrimonies', patrimonyController.index)
routes.post('/patrimonies', patrimonyController.create)

export default routes