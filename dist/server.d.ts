import MethodParams from './method-params';
import { Container } from 'inversify';
export default class Server {
    private static getMethodRoutes;
    private static postMethodRoutes;
    private static deleteMethodRoutes;
    private static routeControllers;
    private app;
    private container;
    static registerRouteControllers(controllerName: string, params: any): void;
    static registerGetMethodRoutes(params: MethodParams): void;
    static registerPostMethodRoutes(params: MethodParams): void;
    static registerDeleteMethodRoutes(params: MethodParams): void;
    constructor(app: any, container: Container);
    start(port: number): void;
}
