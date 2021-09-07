import { Router } from 'express';
import { UserController } from './controllers/user';
import { authMiddleware } from './middlewares/auth';

const router = Router();
const userController = new UserController();

router.post('/users', userController.create);
router.post('/users/authenticate', userController.authenticate);
router.get('/users', authMiddleware, userController.listUsers)

export { router };