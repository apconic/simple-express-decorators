import Server from './server';
import MethodParams from './method-params'

export function get(path: string) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const name = Object.create(target).constructor.name;
    Server.registerGetMethodRoutes(new MethodParams(name, path, propertyKey));
  }
}

export function post(path: string) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const name = Object.create(target).constructor.name;
    Server.registerPostMethodRoutes(new MethodParams(name, path, propertyKey));
  }
}

export function del(path: string) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const name = Object.create(target).constructor.name;
    Server.registerDeleteMethodRoutes(new MethodParams(name, path, propertyKey));
  }
}

export function controller(name: any, basePath: string) {
  return function(target: Function) {
    Server.registerRouteControllers(target.name, { basePath, name });
  }
}
