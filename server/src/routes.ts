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
routes.put("/sectors/:id", sectorController.createOrUpdate);
routes.delete("/sectors/:id", sectorController.delete);
routes.post("/sectors", sectorController.createOrUpdate);

routes.get("/owners", ownerController.index);
routes.put("/owners/:id", ownerController.createOrUpdate);
routes.delete("/owners/:id", ownerController.delete);
routes.post("/owners", ownerController.createOrUpdate);

routes.get("/categories", categoryController.index);
routes.put("/categories/:id", categoryController.createOrUpdate);
routes.delete("/categories/:id", categoryController.delete);
routes.post("/categories", categoryController.createOrUpdate);

routes.get("/patrimonies", patrimonyController.index);
routes.put("/patrimonies/transfer", patrimonyController.transfer);
routes.put("/patrimonies/:id", patrimonyController.createOrUpdate);
routes.delete("/patrimonies/:id", patrimonyController.delete);
routes.post("/patrimonies", patrimonyController.createOrUpdate);

export default routes;
