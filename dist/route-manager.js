"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RouteManager {
    constructor(router, container) {
        this.router = router;
        this.container = container;
    }
    static registerRouteControllers(controllerName, params) {
        RouteManager.routeControllers.set(controllerName, params);
    }
    static registerGetMethodRoutes(params) {
        RouteManager.getMethodParams.push(params);
    }
    static registerPostMethodRoutes(params) {
        RouteManager.postMethodParams.push(params);
    }
    static registerDeleteMethodRoutes(params) {
        RouteManager.deleteMethodParams.push(params);
    }
    configure(authenticator) {
        RouteManager.getMethodParams.forEach(params => {
            const { target, path, role, propertyKey } = params;
            const routeControllerConfig = RouteManager.routeControllers.get(target);
            const targetController = routeControllerConfig.name;
            const routePath = `${routeControllerConfig.basePath}${path}`;
            this.router.get(routePath, role ? authenticator(role) : authenticator(), (request, response) => {
                const controller = this.container.get(targetController);
                if (!controller || !controller[propertyKey]) {
                    return response.status(404).send({ message: 'Invalid path' });
                }
                controller[propertyKey](request, response);
            });
        });
        RouteManager.postMethodParams.forEach(params => {
            const { target, path, role, propertyKey } = params;
            const routeControllerConfig = RouteManager.routeControllers.get(target);
            const targetController = routeControllerConfig.name;
            const routePath = `${routeControllerConfig.basePath}${path}`;
            this.router.post(routePath, role ? authenticator(role) : authenticator(), (request, response) => {
                const controller = this.container.get(targetController);
                if (!controller || !controller[propertyKey]) {
                    return response.status(404).send({ message: 'Invalid path' });
                }
                controller[propertyKey](request, response);
            });
        });
        RouteManager.deleteMethodParams.forEach(params => {
            const { target, path, role, propertyKey } = params;
            const routeControllerConfig = RouteManager.routeControllers.get(target);
            const targetController = routeControllerConfig.name;
            const routePath = `${routeControllerConfig.basePath}${path}`;
            this.router.delete(routePath, role ? authenticator(role) : authenticator(), (request, response) => {
                const controller = this.container.get(targetController);
                if (!controller || !controller[propertyKey]) {
                    return response.status(404).send({ message: 'Invalid path' });
                }
                controller[propertyKey](request, response);
            });
        });
    }
}
RouteManager.getMethodParams = [];
RouteManager.postMethodParams = [];
RouteManager.deleteMethodParams = [];
RouteManager.routeControllers = new Map();
exports.default = RouteManager;
