export default class MethodParams {
  path: string;
  target: any;
  propertyKey: string;
  constructor(target: any, path: string, propertyKey: string) {
    this.target = target;
    this.path = path;
    this.propertyKey = propertyKey;
  }
};
