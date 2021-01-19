import express from 'express';
import SectorController from './controllers/SectorController';

const sectorController = new SectorController();

const routes = express.Router();

routes.get('/sectors', sectorController.index);
routes.post('/sectors', sectorController.create);

export default routes;
