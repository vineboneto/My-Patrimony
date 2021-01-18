import express from 'express';
import SectorController from './controllers/SectorController';

const sectorController = new SectorController();

const routes = express.Router();

routes.get('/sectors', sectorController.index);

export default routes;
