import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export function authenticateToken(req: Request, res: Response, next: NextFunction): Response | void {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido!' });
  }

  jwt.verify(token, process.env.JWT_SECRET!, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido!' });
    }

    if (!decoded) {
      return res.status(403).json({ message: 'Token inválido!' });
    }

    const user = decoded as { id: number; name: string; email: string };
    req.user = user;

    next();
  });
}
