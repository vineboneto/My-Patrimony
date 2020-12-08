import express, { Response } from 'express'
import OwnerController from './controllers/OwnerController'
import SectorController from './controllers/SectorController'

const routes = express.Router()
const sectorController = new SectorController
const ownerController = new OwnerController


routes.get('/sectors', sectorController.index)
routes.post('/sectors', sectorController.create)
routes.post('/owners', ownerController.create)

export default routes