import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { findUserByEmail } from '../repositories/authRepository';
import * as userRepository from '../repositories/userRepository';


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

export async function createUser(name: string, email: string, password: string) {

  const existingUser = await userRepository.findUserByEmail(email);

  if (existingUser) {
    throw { type: 'Conflict', message: 'E-mail já cadastrado' };
  }

  const hashedPassword = await bcrypt.hash(password, 10);


  const newUser = await userRepository.createUser(name, email, hashedPassword);

  return newUser;
}

export async function deleteUser(userId: number) {
  await userRepository.deleteUserAndCredentials(userId);
}