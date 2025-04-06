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