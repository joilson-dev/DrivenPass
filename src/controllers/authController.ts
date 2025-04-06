import { Request, Response, NextFunction } from 'express';
import * as authService from '../services/authService';

export async function signIn(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { email, password } = req.body;

  try {
    const token = await authService.signInService(email, password);
    res.status(200).json({ message: 'Login bem-sucedido', token });
  } catch (error) {
    next(error);
  }
}

export async function signUp(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { name, email, password } = req.body;

  try {
    const newUser = await authService.createUser(name, email, password);

    res.status(201).json({ message: 'Usuário criado com sucesso'});
  } catch (error) {
    next(error);
  }
}