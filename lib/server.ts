import MethodParams from './method-params';
import { Container } from 'inversify';
import { Response, Application } from 'express';

export default class Server {
  private static getMethodRoutes: Array<MethodParams> = [];
  private static postMethodRoutes: Array<MethodParams> = [];
  private static deleteMethodRoutes: Array<MethodParams> = [];
  private static routeControllers: Map<string, any> = new Map<string, any>();
  private app: Application;
  private container: Container;

  public static registerRouteControllers(controllerName: string, params: any) {
    Server.routeControllers.set(controllerName, params);    
  }

  public static registerGetMethodRoutes(params: MethodParams) {
    Server.getMethodRoutes.push(params);
  }

  public static registerPostMethodRoutes(params: MethodParams) {
    Server.postMethodRoutes.push(params);
  }

  public static registerDeleteMethodRoutes(params: MethodParams) {
    Server.deleteMethodRoutes.push(params);
  }

  constructor(app: any, container: Container) {
    this.app = app;
    this.container = container;
  }

  start(port: number) {
    Server.getMethodRoutes.forEach(route => {
      const routeControllerConfig = Server.routeControllers.get(route.target);
      const targetController = routeControllerConfig.name;
      const routePath = `${routeControllerConfig.basePath}${route.path}`;
      this.app.get(routePath, (request: any, response: any) => {
        const controller: any = this.container.get(targetController);
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
      this.app.post(routePath, (request: any, response: any) => {
        const controller: any = this.container.get(targetController);
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
      this.app.post(routePath, (request: any, response: Response) => {
        const controller: any = this.container.get(targetController);
        if (!controller && !controller[deleteRoute.propertyKey]) {
          return response.status(404).send({ message: 'Invalid path' });
        }
        controller[deleteRoute.propertyKey](request, response);
      });    
    });

    this.app.listen(port);
  }
}