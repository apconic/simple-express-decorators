"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./server"));
exports.Server = server_1.default;
const route_decorators_1 = require("./route-decorators");
exports.controller = route_decorators_1.controller;
exports.get = route_decorators_1.get;
exports.post = route_decorators_1.post;
exports.del = route_decorators_1.del;
