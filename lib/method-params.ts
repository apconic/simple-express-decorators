export default class MethodParams {
  path: string;
  target: any;
  propertyKey: string;
  role: any;
  constructor(target: any, path: string, propertyKey: string, role?: any) {
    this.target = target;
    this.path = path;
    this.propertyKey = propertyKey;
    this.role = role;
  }
};
