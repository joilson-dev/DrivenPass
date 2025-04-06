import * as credentialRepository from '../repositories/credentialsRepository';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import cryptr from 'cryptr';

dotenv.config();
const cryptrInstance = new cryptr(process.env.SECRET_KEY);


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


  const hashedPassword = cryptrInstance.encrypt(password);

  const newCredential = await credentialRepository.createCredential(title, url, username, hashedPassword, userId);

  return newCredential;
}

export async function getAllCredentials(userId: number) {
  const credentials = await credentialRepository.findAllCredentials(userId);

  credentials.forEach(cred => {
    cred.password = cryptrInstance.decrypt(cred.password);
  });

  return credentials;
}


export async function updateCredential(
  credentialId: number,
  title: string,
  url: string,
  username: string,
  password: string
) {
  let hashedPassword = password;

  if (password) {
    const saltRounds = 10;
    hashedPassword = await bcrypt.hash(password, saltRounds);
  }

  const updatedCredential = await credentialRepository.updateCredential(
    credentialId,
    title,
    url,
    username,
    hashedPassword
  );

  return updatedCredential;
}