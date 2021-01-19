import express from "express";
import SectorController from "./controllers/SectorController";
import OwnerController from "./controllers/OwnerController";
import CategoryController from "./controllers/CategoryController";

const sectorController = new SectorController();
const ownerController = new OwnerController();
const categoryController = new CategoryController();

const routes = express.Router();

routes.get("/sectors", sectorController.index);
routes.post("/sectors", sectorController.create);
routes.get("/owners", ownerController.index);
routes.post("/owners", ownerController.create);
routes.get("/categories", categoryController.index);
// routes.post("/categories", categoryController.create);

export default routes;
