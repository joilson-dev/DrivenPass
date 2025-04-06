import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const email = "demo@driven.com.br";
  const password = "demo123";

  const userExists = await prisma.user.findUnique({
    where: { email },
  });

  if (!userExists) {
    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        name: "Demo",
        email: email,
        password: hashedPassword,
      },
    });

    console.log("Usuário 'Demo' criado com sucesso!");
  } else {
    console.log("O usuário 'Demo' já existe.");
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
