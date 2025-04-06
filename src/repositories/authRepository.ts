import prisma from '../database';
import { User } from '@prisma/client';

export async function findUserByEmail(email: string): Promise<User | null> {
  const user = await prisma.user.findUnique({
    where: { email },
  });
  return user;
}