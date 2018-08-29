import MethodParams from './method-params';
import { Container } from 'inversify';
import { Response, Router } from 'express';

export default class RouteManager {
  private static getMethodParams: Array<MethodParams> = [];
  private static postMethodParams: Array<MethodParams> = [];
  private static deleteMethodParams: Array<MethodParams> = [];
  private static routeControllers: Map<string, any> = new Map<string, any>();
  private router: Router;
  private container: Container;

  public static registerRouteControllers(controllerName: string, params: any) {
    RouteManager.routeControllers.set(controllerName, params);
  }

  public static registerGetMethodRoutes(params: MethodParams) {
    RouteManager.getMethodParams.push(params);
  }

  public static registerPostMethodRoutes(params: MethodParams) {
    RouteManager.postMethodParams.push(params);
  }

  public static registerDeleteMethodRoutes(params: MethodParams) {
    RouteManager.deleteMethodParams.push(params);
  }

  constructor(router: Router, container: Container) {
    this.router = router;
    this.container = container;
  }

  configure(authenticator: Function) {
    RouteManager.getMethodParams.forEach(params => {
      const { target, path, role, propertyKey } = params;
      const routeControllerConfig = RouteManager.routeControllers.get(target);
      const targetController = routeControllerConfig.name;
      const routePath = `${routeControllerConfig.basePath}${path}`;
      this.router.get(
        routePath,
        role ? authenticator(role) : authenticator(),
        (request: any, response: any, next: any) => {
          const controller: any = this.container.get(targetController);
          if (!controller || !controller[propertyKey]) {
            return response.status(404).send({ message: 'Invalid path' });
          }
          controller[propertyKey](request, response, next);
        }
      );
    });
    RouteManager.postMethodParams.forEach(params => {
      const { target, path, role, propertyKey } = params;
      const routeControllerConfig = RouteManager.routeControllers.get(target);
      const targetController = routeControllerConfig.name;
      const routePath = `${routeControllerConfig.basePath}${path}`;
      this.router.post(
        routePath,
        role ? authenticator(role) : authenticator(),
        (request: any, response: any, next: any) => {
          const controller: any = this.container.get(targetController);
          if (!controller || !controller[propertyKey]) {
            return response.status(404).send({ message: 'Invalid path' });
          }
          controller[propertyKey](request, response, next);
        }
      );
    });

    RouteManager.deleteMethodParams.forEach(params => {
      const { target, path, role, propertyKey } = params;
      const routeControllerConfig = RouteManager.routeControllers.get(target);
      const targetController = routeControllerConfig.name;
      const routePath = `${routeControllerConfig.basePath}${path}`;
      this.router.delete(
        routePath,
        role ? authenticator(role) : authenticator(),
        (request: any, response: any, next: any) => {
          const controller: any = this.container.get(targetController);
          if (!controller || !controller[propertyKey]) {
            return response.status(404).send({ message: 'Invalid path' });
          }
          controller[propertyKey](request, response, next);
        }
      );
    });
  }
}
