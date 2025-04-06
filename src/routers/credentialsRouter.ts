import { Router } from 'express';
import { createCredential, getAllCredentials,updateCredential } from '../controllers/credentialsController';
import { validate } from '../middlewares/validationMiddleware';
import { credentialSchema } from '../schemas/credentialsSchema';
import { authenticateToken } from '../middlewares/authMiddleware';

const credentialRouter = Router();

credentialRouter.post('/',authenticateToken, validate(credentialSchema), createCredential);
credentialRouter.get('/', authenticateToken, getAllCredentials);
credentialRouter.put('/:id', authenticateToken, validate(credentialSchema), updateCredential);

export default credentialRouter;
