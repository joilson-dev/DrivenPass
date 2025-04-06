import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { findUserByEmail } from '../repositories/authRepository';

export async function signInService(email: string, password: string): Promise<string> {
  const user = await findUserByEmail(email);

  if (!user) {
    throw { type: 'NotFound', message: 'Usuário não encontrado' };;
  }

  const isPasswordValid = bcrypt.compareSync(password, user.password);
  if (!isPasswordValid) {
    throw { type: 'InvalidData', message: 'Senha incorreta' };;
  }

  const token = jwt.sign(
    { id: user.id, name: user.name, email: user.email },
    process.env.JWT_SECRET!,
    { expiresIn: '1h' }
  );

  return token;
}
