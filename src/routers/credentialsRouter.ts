import { Router } from 'express';
import { createCredential, getAllCredentials } from '../controllers/credentialsController';
import { validate } from '../middlewares/validationMiddleware';
import { credentialSchema } from '../schemas/credentialsSchema';
import { authenticateToken } from '../middlewares/authMiddleware';

const credentialRouter = Router();

credentialRouter.post('/',authenticateToken, validate(credentialSchema), createCredential);
credentialRouter.get('/', authenticateToken, getAllCredentials);

export default credentialRouter;
