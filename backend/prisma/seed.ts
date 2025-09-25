// server/prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Usuários
  const admin = await prisma.user.create({
    data: {
      username: 'admin',
      name: 'Administrador',
      email: 'admin@admin.com',
      password: 'senha123',
      cpf: '12345678901',
      role: 'ADMIN',
    },
  });

  const manager = await prisma.user.create({
    data: {
      username: 'manager',
      name: 'Gerente',
      email: 'manager@admin.com',
      password: 'senha456',
      cpf: '23456789012',
      role: 'MANAGER',
    },
  });

  const contributor = await prisma.user.create({
    data: {
      username: 'contributor',
      name: 'Colaborador',
      email: 'contributor@admin.com',
      password: 'senha789',
      cpf: '34567890123',
      role: 'CONTRIBUTOR',
    },
  });

  // Times
  const teamA = await prisma.team.create({
    data: {
      name: 'Time Alpha',
      description: 'Equipe principal',
      members: {
        connect: [{ id: admin.id }, { id: contributor.id }],
      },
    },
  });

  const teamB = await prisma.team.create({
    data: {
      name: 'Time Beta',
      description: 'Equipe secundária',
      members: {
        connect: [{ id: manager.id }, { id: contributor.id }],
      },
    },
  });

  // Projetos
  await prisma.project.create({
    data: {
      name: 'Projeto 1',
      description: 'Primeiro projeto',
      manager: { connect: { id: manager.id } },
      status: 'IN_PROGRESS',
      teams: {
        connect: [{ id: teamA.id }],
      },
    },
  });

  await prisma.project.create({
    data: {
      name: 'Projeto 2',
      description: 'Segundo projeto',
      manager: { connect: { id: admin.id } },
      status: 'BACKLOG',
      teams: {
        connect: [{ id: teamB.id }],
      },
    },
  });
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
