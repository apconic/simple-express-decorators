# simple-express-decorators
Very simple implementation of express decorators. Depends on inversify

```
import 'reflect-metadata';
import express from 'express';
import { injectable, inject, Container } from 'inversify';
import { controller, get, post, Server } from 'simple-express-decorators';

@injectable()
class UserService {
  getUsers() : Array<object> {
    return [{ id: 1, name: 'Suhail Ansari' }];
  }

  addUser(): any {
    return { id: 2, name: 'Test' };
  }
}

const TYPES = {
  UserService: Symbol('UserService'),
  UserController: Symbol('UserController')
};

@injectable()
@controller(TYPES.UserController, '/users')
class UserController {
  @inject(TYPES.UserService)
  private userService: UserService;

  @get('/')
  getUsers(request: any, response: any) {
    return response.send(this.userService.getUsers());
  }

  @post('/create')
  addUser(request: any, response: any) {
    return response.send(this.userService.addUser());
  }
}

const container = new Container();
container.bind<UserService>(TYPES.UserService).to(UserService);
container.bind<UserController>(TYPES.UserController).to(UserController);

const app = express();
const server = new Server(app, container);
server.start(3000);
```