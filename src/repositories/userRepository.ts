import prisma from '../database';

export async function findUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
  });
}

export async function createUser(name: string, email: string, password: string) {
  return prisma.user.create({
    data: {
      name,
      email,
      password,
    },
  });
}

export async function deleteUserAndCredentials(userId: number) {
  await prisma.credential.deleteMany({
    where: {
      userId,
    },
  });

  return prisma.user.delete({
    where: {
      id: userId,
    },
  });
}