import bcrypt from 'bcryptjs';

import { prisma } from "../models/prisma.js";
import {checkToken, createToken} from '../utils/jwt.js';
import {createUserService} from '../services/user.service.js';

const responseTokenCookies = (res, user) => {
  const accessToken = createToken({ id: user.id, user: user.username, name: user.name, role: user.role }, '15m');
  const refreshToken = createToken({ id: user.id, user: user.username, name: user.name, role: user.role }, '7d');
  res.cookie('access_token', accessToken, { httpOnly: true, secure: false, sameSite: 'lax' });
  res.cookie('refresh_token', refreshToken, { httpOnly: true, secure: false, sameSite: 'lax' });

  return { accessToken, refreshToken };
};

export const signIn = async (req, res) => {
  const { username, password } = req.body;
  const user = await prisma.user.findUnique({ where: { username } });
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ mensagem: 'Username or password invalid' });
  }
  const tokens = responseTokenCookies(res, user);
  res.json(tokens);
}

export const signUp = async (req, res) => {
  const { username, cpf } = req.body;

  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [
        { username },
        { cpf }
      ]
    }
  });
  if (existingUser) {
    return res.status(400).json({ message: 'Username or CPF already registered' });
  }

  try {
    const user = await createUserService(req.body)
    const tokens = responseTokenCookies(res, user);
    res.status(201).json(tokens);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }

};

export const logout = (req, res) => {
  res.clearCookie('access_token', { httpOnly: true, secure: false, sameSite: 'lax' });
  res.clearCookie('refresh_token', { httpOnly: true, secure: false, sameSite: 'lax' });
  res.json({ message: 'Logout successful' });
};


export const refresh = (req, res) => {
  const refreshToken = req.cookies['refresh_token'];
  if (!refreshToken) {
    return res.status(401).json({ message: 'Refresh token required' });
  }
  try {
    const payload = checkToken(refreshToken);
    const user = { id: payload.id, username: payload.user, role: payload.role };
    const accessToken = createToken(user, '15m');
    res.cookie('access_token', accessToken, { httpOnly: true, secure: false, sameSite: 'lax' });
    res.json({ accessToken });
  } catch (err) {
    return res.status(401).json({ message: 'Invalid refresh token' });
  }
};

export const checkSession = (req, res) => {
  const accessToken = req.cookies['access_token'];
  if (!accessToken) {
    return res.json({ session: false, message: 'No token provided' });
  }
  try {
    const payload = checkToken(accessToken);
    res.json({ session: true, user: payload });
  } catch (err) {
    return res.json({ session: false, message: 'Invalid token' });
  }
};
