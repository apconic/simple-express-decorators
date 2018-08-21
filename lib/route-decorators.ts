import RouteManager from './route-manager';
import MethodParams from './method-params'

export function get(path: string, role?: any) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const name = Object.create(target).constructor.name;
    RouteManager.registerGetMethodRoutes(new MethodParams(name, path, propertyKey, role || null));
  }
}

export function post(path: string, role?: any) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const name = Object.create(target).constructor.name;
    RouteManager.registerPostMethodRoutes(new MethodParams(name, path, propertyKey, role || null));
  }
}

export function del(path: string, role?: any) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const name = Object.create(target).constructor.name;
    RouteManager.registerDeleteMethodRoutes(new MethodParams(name, path, propertyKey, role || null));
  }
}

export function controller(name: any, basePath: string) {
  return function(target: Function) {
    RouteManager.registerRouteControllers(target.name, { basePath, name });
  }
}
