import * as credentialRepository from '../repositories/credentialsRepository';
import bcrypt from 'bcryptjs';


export async function createCredential(
  title: string,
  url: string,
  username: string,
  password: string,
  userId: number
) {

  const existingCredential = await credentialRepository.findCredentialByTitle(title, userId);

  if (existingCredential) {

    throw { type: 'Conflict', message: 'Título já cadastrado para este usuário' };
  }


  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);


  const newCredential = await credentialRepository.createCredential(title, url, username, hashedPassword, userId);

  return newCredential;
}
