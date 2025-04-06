import { Router } from 'express';
import { signUp,signIn } from '../controllers/authController';
import { validate } from '../middlewares/validationMiddleware';
import { signUpSchema, signInSchema } from '../schemas/authSchema';

const authRouter = Router();

authRouter.post('/sign-up', validate(signUpSchema), signUp);
authRouter.post('/sign-in', validate(signInSchema), signIn);

export default authRouter;