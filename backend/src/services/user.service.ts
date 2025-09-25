import bcrypt from 'bcryptjs';

import { prisma } from '../models/prisma.js';
import {maskCpf} from '../utils/cpf.js';

export async function createUserService({ username, password, name, cpf, role, email }) {
  const existingUser = await prisma.user.findFirst({
    where: { OR: [{ username }, { cpf }] }
  });
  if (existingUser) {
    throw new Error('Username or CPF already registered');
  }
  const passwordHash = bcrypt.hashSync(password, 10);

  const user = await prisma.user.create({
    data: {
      username,
      email,
      name,
      password: passwordHash,
      cpf,
      role: role || 'CONTRIBUTOR'
    }
  });

  user.password = undefined;
  user.cpf = maskCpf(user.cpf);

  return user;
}
