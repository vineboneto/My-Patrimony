import express from "express";
import SectorController from "./controllers/SectorController";
import OwnerController from "./controllers/OwnerController";

const sectorController = new SectorController();
const ownerController = new OwnerController();

const routes = express.Router();

routes.get("/sectors", sectorController.index);
routes.post("/sectors", sectorController.create);
routes.get("/owners", ownerController.index);
routes.post("/owners", ownerController.create);

export default routes;
