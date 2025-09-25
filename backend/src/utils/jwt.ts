import jwt from 'jsonwebtoken';

const SECRET = 'ulife';

export function createToken(payload: object, expiresIn) {
  return jwt.sign(payload, SECRET, { expiresIn });
}

export function checkToken(token: string) {
  return jwt.verify(token, SECRET);
}
