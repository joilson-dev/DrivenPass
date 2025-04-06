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

export async function getAllCredentials(req: Request, res: Response, next: NextFunction): Promise<void> {
  const userId = req.user.id;

  try {
    const credentials = await credentialService.getAllCredentials(userId);

    res.status(200).json(credentials);
  } catch (error) {
    next(error);
  }
}

export async function updateCredential(req: Request, res: Response, next: NextFunction): Promise<void> {
  const { title, url, username, password } = req.body;
  const credentialId = parseInt(req.params.id, 10);

  if (isNaN(credentialId)) {
    res.status(400).json({ message: 'ID de credencial inválido' });
    return
  }

  try {
    await credentialService.updateCredential(credentialId, title, url, username, password);

    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

export async function deleteCredential(req: Request, res: Response, next: NextFunction): Promise<void> {
  const credentialId = parseInt(req.params.id, 10);

  const userId = req.user.id;

  if (isNaN(credentialId)) {
    res.status(400).json({ message: 'ID de credencial inválido' });
    return
  }

  try {

    await credentialService.deleteCredential(credentialId, userId);

    res.status(204).send();
  } catch (error) {
    next(error);
  }
}