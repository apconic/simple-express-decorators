import express, { Router, Application, RequestHandler } from 'express';
import RouteManager from './route-manager';
import { Container } from 'inversify';

export default class Server {
  private port: any;
  private app: Application;
  private container: Container;
  private routeManagers: Map<string, RouteManager> = new Map<string, RouteManager>();

  constructor(port: any, container: Container) {
    this.port = port;
    this.app = express();
    this.container = container;
  }

  use(...middleWareFunc: RequestHandler[]) {
    this.app.use(middleWareFunc);
  }

  createRouter(path: string, authenticator: Function) {
    const router = express.Router();
    const routeManager = new RouteManager(router, this.container);
    routeManager.configure(authenticator);
    this.routeManagers.set(path, routeManager);
    this.app.use(path, router);
  }

  start() {
    this.app.listen(this.port);
  }
}