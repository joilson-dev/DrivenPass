import { Request, Response, NextFunction } from 'express';
import * as credentialService from '../services/credentialsService';

export async function createCredential(req: Request, res: Response, next: NextFunction): Promise<void> {
  const { title, url, username, password } = req.body;

  if (!req.user) {
    res.status(401).json({ message: 'Usuário não autenticado' });
  return
  }

  const userId = req.user.id;

  try {
    const newCredential = await credentialService.createCredential(title, url, username, password, userId);

    res.status(201).send();
  } catch (error) {
    next(error);
  }
}
