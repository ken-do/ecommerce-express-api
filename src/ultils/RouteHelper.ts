import ICRUDController from "../interfaces/CRUDController";
import { Application } from "express";

class RouteHelper {
    private app: Application;

    constructor (app: Application) {
        this.app = app;
    }
    
    createCRUDRoutes(path: string, controller: ICRUDController) {
        this.app.get(path, controller.index.bind(controller));
        this.app.get(path + '/:id', controller.read.bind(controller));
        this.app.post(path, controller.create.bind(controller));
        this.app.post(path + '/:id', controller.update.bind(controller));
        this.app.delete(path + '/:id', controller.remove.bind(controller));
    }
}

export default RouteHelper;