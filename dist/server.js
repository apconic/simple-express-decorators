"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const route_manager_1 = __importDefault(require("./route-manager"));
class Server {
    constructor(port, container) {
        this.routeManagers = new Map();
        this.port = port;
        this.app = express_1.default();
        this.httpServer = null;
        this.container = container;
    }
    use(...middleWareFunc) {
        this.app.use(middleWareFunc);
    }
    createRouter(path, authenticator) {
        const router = express_1.default.Router();
        const routeManager = new route_manager_1.default(router, this.container);
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
exports.default = Server;
