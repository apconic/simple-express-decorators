"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./server"));
const method_params_1 = __importDefault(require("./method-params"));
function get(path) {
    return function (target, propertyKey, descriptor) {
        const name = Object.create(target).constructor.name;
        server_1.default.registerGetMethodRoutes(new method_params_1.default(name, path, propertyKey));
    };
}
exports.get = get;
function post(path) {
    return function (target, propertyKey, descriptor) {
        const name = Object.create(target).constructor.name;
        server_1.default.registerPostMethodRoutes(new method_params_1.default(name, path, propertyKey));
    };
}
exports.post = post;
function del(path) {
    return function (target, propertyKey, descriptor) {
        const name = Object.create(target).constructor.name;
        server_1.default.registerDeleteMethodRoutes(new method_params_1.default(name, path, propertyKey));
    };
}
exports.del = del;
function controller(name, basePath) {
    return function (target) {
        server_1.default.registerRouteControllers(target.name, { basePath, name });
    };
}
exports.controller = controller;
