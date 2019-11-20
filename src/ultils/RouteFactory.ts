import { Application } from "express";

import ICRUDController from "../interfaces/CRUDController";
import IRoutes from "../interfaces/Route";
import IPrivateRoutes from "../interfaces/PrivateRoute";

import passport from '../../passport';

class RouteFactory {
    private app: Application;

    constructor(app: Application) {
        this.app = app;
    }

    makePublic(routes: IRoutes[]) {
        for (let route of routes) {
            const path = process.env.API_NAMESPACE + route.path;

            if (route.requestMethod && route.handler) {
                const handler = route.controller[route.handler].bind(route.controller);
                this.app[route.requestMethod](path, handler);
            }

            if (route.useCRUD) {
                this.createCRUDRoutes(path, route.controller)
            }
        }
    }

    private createCRUDRoutes(path: string, controller: ICRUDController) {
        this.app.get(path, controller.index.bind(controller));
        this.app.post(path, controller.create.bind(controller));
        this.app.get(path + '/:id', controller.read.bind(controller));
        this.app.post(path + '/:id', controller.update.bind(controller));
        this.app.delete(path + '/:id', controller.remove.bind(controller));
    }

    makePrivate(routes: IPrivateRoutes[]) {
        for (let route of routes) {
            const path = process.env.API_NAMESPACE + route.path;
            const authenticator = this.addAuthenticator(route.authenticate, route.authenticateOptions);

            if (route.requestMethod && route.handler) {
                const handler = route.controller[route.handler].bind(route.controller);
                this.app[route.requestMethod](path, authenticator, handler);
            }

            if (route.useCRUD) {
                this.createPrivateCRUDRoutes(path, authenticator, route.controller)
            }
        }
    }

    private addAuthenticator(strategy: string, options: object) {
        return passport.authenticate(strategy, options)
    }

    private createPrivateCRUDRoutes(path: string, authenticator: any, controller: ICRUDController) {
        this.app.get(path, authenticator, controller.index.bind(controller));
        this.app.post(path, authenticator, controller.create.bind(controller));
        this.app.get(path + '/:id', authenticator, controller.read.bind(controller));
        this.app.post(path + '/:id', authenticator, controller.update.bind(controller));
        this.app.delete(path + '/:id', authenticator, controller.remove.bind(controller));
    }
}

export default RouteFactory;