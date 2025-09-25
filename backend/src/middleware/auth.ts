import {checkToken} from '../utils/jwt.js';

export const requireAuth = (req, res, next) => {
  const token = req.cookies['access_token'];

  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }
  try {
    req.user = checkToken(token);
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};
