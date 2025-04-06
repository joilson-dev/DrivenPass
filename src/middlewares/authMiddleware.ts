import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export function authenticateToken(req: Request, res: Response, next: NextFunction): void {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'Token não fornecido!' });
    return;
  }

  jwt.verify(token, process.env.JWT_SECRET!, (err, decoded) => {
    if (err) {
      res.status(403).json({ message: 'Token inválido!' });
      return;
    }

    if (decoded) {
      const user = decoded as { id: number; name: string; email: string };
      req.user = user;
    } else {
      res.status(403).json({ message: 'Token inválido!' });
      return;
    }

    next();
  });
}
