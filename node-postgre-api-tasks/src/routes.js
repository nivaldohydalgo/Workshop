import { Router } from 'express';

import authMiddleware from './app/middlewares/auth';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import TaskController from './app/controllers/TaskController';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

// routes.put('/users', authMiddleware, UserController.update);
// todas as rotas que estiverem abaixo desse use executarão o authMiddleware
routes.use(authMiddleware);
routes.put('/users', UserController.update);
routes.post('/task', TaskController.store);
routes.get('/task', TaskController.index);
routes.put('/task/:task_id', TaskController.update);
routes.delete('/task/:task_id', TaskController.delete);

export default routes;
