"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Server {
    constructor(app, container) {
        this.app = app;
        this.container = container;
    }
    static registerRouteControllers(controllerName, params) {
        Server.routeControllers.set(controllerName, params);
    }
    static registerGetMethodRoutes(params) {
        Server.getMethodRoutes.push(params);
    }
    static registerPostMethodRoutes(params) {
        Server.postMethodRoutes.push(params);
    }
    static registerDeleteMethodRoutes(params) {
        Server.deleteMethodRoutes.push(params);
    }
    start(port) {
        Server.getMethodRoutes.forEach(route => {
            const routeControllerConfig = Server.routeControllers.get(route.target);
            const targetController = routeControllerConfig.name;
            const routePath = `${routeControllerConfig.basePath}${route.path}`;
            this.app.get(routePath, (request, response) => {
                const controller = this.container.get(targetController);
                if (!controller || !controller[route.propertyKey]) {
                    return response.status(404).send({ message: 'Invalid path' });
                }
                controller[route.propertyKey](request, response);
            });
        });
        Server.postMethodRoutes.forEach(postRoute => {
            const routeControllerConfig = Server.routeControllers.get(postRoute.target);
            const targetController = routeControllerConfig.name;
            const routePath = `${routeControllerConfig.basePath}${postRoute.path}`;
            this.app.post(routePath, (request, response) => {
                const controller = this.container.get(targetController);
                if (!controller || !controller[postRoute.propertyKey]) {
                    return response.status(404).send({ message: 'Invalid path' });
                }
                controller[postRoute.propertyKey](request, response);
            });
        });
        Server.deleteMethodRoutes.forEach(deleteRoute => {
            const routeControllerConfig = Server.routeControllers.get(deleteRoute.target);
            const targetController = routeControllerConfig.name;
            const routePath = `${routeControllerConfig.basePath}${deleteRoute.path}`;
            this.app.post(routePath, (request, response) => {
                const controller = this.container.get(targetController);
                if (!controller && !controller[deleteRoute.propertyKey]) {
                    return response.status(404).send({ message: 'Invalid path' });
                }
                controller[deleteRoute.propertyKey](request, response);
            });
        });
        this.app.listen(port);
    }
}
Server.getMethodRoutes = [];
Server.postMethodRoutes = [];
Server.deleteMethodRoutes = [];
Server.routeControllers = new Map();
exports.default = Server;
