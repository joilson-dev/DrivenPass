import { Request, Response, NextFunction } from 'express';
import * as userService from '../services/userService'; 


export async function deleteAccount(req: Request, res: Response, next: NextFunction): Promise<void> {
  const userId = req.user.id;

  try {

    await userService.deleteUser(userId);

    res.status(204).send();
  } catch (error) {
    next(error);
  }
}