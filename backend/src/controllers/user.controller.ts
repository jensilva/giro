import {Request, Response} from 'express';
import bcrypt from 'bcryptjs';

import {prisma} from '../models/prisma.js';
import {maskCpf} from '../utils/cpf.js';
import {createUserService} from '../services/user.service.js';


export const getUsers = async (req: Request, res: Response) => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      username: true,
      role: true,
      cpf: true
    }
  });

  const maskedUsers = users.map(user => ({
    ...user,
    cpf: maskCpf(user.cpf)
  }));

  res.json(maskedUsers);
};

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await prisma.user.findUnique({
    where: { id: Number(id) },
    select: {
      id: true,
      name: true,
      username: true,
      role: true,
      cpf: true
    }
  });

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  user.cpf = maskCpf(user.cpf);

  res.json(user);
}

export const getManagers = async (req: Request, res: Response) => {
  const managers = await prisma.user.findMany({
    where: {
      role: {
        not: "CONTRIBUTOR"
      }
    }
  });

  const maskedManagers = managers.map(user => ({
    ...user,
    cpf: maskCpf(user.cpf)
  }));

  res.json(maskedManagers);
}

export const createUser = async (req: Request, res: Response) => {
  try {
    const user = await createUserService(req.body)
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export const editUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, password, role } = req.body;

  const data: any = { name, role };

  if (typeof password === 'string' && password.length > 0) {
    data.password = bcrypt.hashSync(password, 10);
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { id: Number(id) },
      data
    });

    updatedUser.cpf = maskCpf(updatedUser.cpf);

    res.json(updatedUser);
  } catch (error) {
    if (error instanceof Error && error.message.includes('Record to update not found')) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(500).json({ message: 'Internal server error' });
  }
}

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  // @ts-ignore
  const userId = req.user?.id;

  if (Number(id) === userId) {
    return res.status(403).json({ message: 'You cannot delete yourself.' });
  }

  try {
    await prisma.user.delete({
      where: { id: Number(id) }
    });
    res.json({ message: 'User deleted successfully.' });
  } catch (error) {
    if (error instanceof Error && error.message.includes('Record to delete does not exist')) {
      return res.status(404).json({ message: 'User not found.' });
    }
    res.status(500).json({ message: 'Internal server error.' });
  }
}
