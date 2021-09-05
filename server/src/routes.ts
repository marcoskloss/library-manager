import { Router } from 'express';
import { UserController } from './controllers/user';

const router = Router();
const userController = new UserController();

router.post('/users/', userController.create);
router.post('/users/authenticate', userController.authenticate);

export { router };