import { Router } from 'express';
import { deleteAccount } from '../controllers/userController';
import { authenticateToken } from '../middlewares/authMiddleware';

const userRouter = Router();

userRouter.delete('/', authenticateToken, deleteAccount);

export default userRouter;
