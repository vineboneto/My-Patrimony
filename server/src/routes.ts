import express from "express";
import SectorController from "./controllers/SectorController";
import OwnerController from "./controllers/OwnerController";
import CategoryController from "./controllers/CategoryController";
import PatrimonyController from "./controllers/PatrimonyController";

const sectorController = new SectorController();
const ownerController = new OwnerController();
const categoryController = new CategoryController();
const patrimonyController = new PatrimonyController();

const routes = express.Router();

routes.get("/sectors", sectorController.index);
routes.post("/sectors", sectorController.createOrUpdate);
routes.post("/sectors/:id", sectorController.delete);
routes.get("/owners", ownerController.index);
routes.post("/owners", ownerController.createOrUpdate);
routes.post("/owners/:id", ownerController.delete);
routes.get("/categories", categoryController.index);
routes.post("/categories", categoryController.createOrUpdate);
routes.post("/categories/:id", categoryController.delete);
routes.get("/patrimonies", patrimonyController.index);
routes.post("/patrimonies", patrimonyController.createOrUpdate);
routes.post("/patrimonies/transfer", patrimonyController.transfer);

export default routes;
