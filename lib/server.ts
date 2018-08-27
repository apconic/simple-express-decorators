import express, { Application, RequestHandler } from 'express';
import RouteManager from './route-manager';
import { Container } from 'inversify';
import * as http from 'http';
import { RequestHandlerParams } from 'express-serve-static-core';

export default class Server {
  private port: any;
  private app: Application;
  private httpServer: http.Server | null;
  private container: Container;
  private routeManagers: Map<string, RouteManager> = new Map<
    string,
    RouteManager
  >();

  constructor(port: any, container: Container) {
    this.port = port;
    this.app = express();
    this.httpServer = null;
    this.container = container;
  }

  use(...middleWareFunc: any[]) {
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
    if (!this.httpServer) {
      this.httpServer = this.app.listen(this.port);
    }
  }

  stop() {
    if (!this.httpServer) {
      return;
    }
    this.httpServer.close();
    this.httpServer = null;
  }
}
