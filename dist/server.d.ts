import { RequestHandler } from 'express';
import { Container } from 'inversify';
export default class Server {
    private port;
    private app;
    private container;
    private routeManagers;
    constructor(port: any, container: Container);
    use(...middleWareFunc: RequestHandler[]): void;
    createRouter(path: string, authenticator: Function): void;
    start(): void;
}
