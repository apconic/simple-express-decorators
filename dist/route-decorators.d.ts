export declare function get(path: string, role?: any): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
export declare function post(path: string, role?: any): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
export declare function del(path: string, role?: any): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
export declare function controller(name: any, basePath: string): (target: Function) => void;
