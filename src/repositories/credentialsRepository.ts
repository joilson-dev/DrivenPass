import prisma from '../database';


export async function findCredentialByTitle(title: string, userId: number) {
  return prisma.credential.findFirst({
    where: {
      title: title,
      userId: userId,
    },
  });
}

export async function createCredential(title: string, url: string, username: string, password: string, userId: number) {
  return prisma.credential.create({
    data: {
      title,
      url,
      username,
      password,
      userId,
    },
  });
}

export async function findAllCredentials(userId: number) {
  return prisma.credential.findMany({
    where: {
      userId,
    },
  });
}

export async function updateCredential(
  credentialId: number,
  title: string,
  url: string,
  username: string,
  password: string
) {
  const existingCredential = await prisma.credential.findUnique({
    where: { id: credentialId },
  });

  if (!existingCredential) {
    throw { type: 'NotFound', message: 'Credencial não encontrada' };
  }

  return prisma.credential.update({
    where: { id: credentialId },
    data: {
      title,
      url,
      username,
      password,
    },
  });
}

export async function deleteCredential(credentialId: number, userId: number) {
  const existingCredential = await prisma.credential.findUnique({
    where: { id: credentialId },
  });

  if (!existingCredential) {
    throw { type: 'NotFound', message: 'Credencial não encontrada' };
  }

  if (existingCredential.userId !== userId) {
    throw { type: 'Forbidden', message: 'Você não tem permissão para excluir esta credencial' };
  }

  return prisma.credential.delete({
    where: { id: credentialId },
  });
}