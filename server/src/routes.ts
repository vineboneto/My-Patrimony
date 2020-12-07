import express, { Response } from 'express'
import SectorController from './controllers/SectorController'

const routes = express.Router()
const sectorController = new SectorController

routes.get('/sectors', sectorController.index)
routes.post('/sectors', sectorController.create)

export default routes