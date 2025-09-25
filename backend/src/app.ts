import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/users.routes.js';
import teamsRoutes from './routes/teams.routes.js';
import projectsRouters from './routes/projects.routes.js';

const app = express();

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:4200', // coloque o endereço do seu frontend
  credentials: true
}));
app.use(cookieParser());

// Rotas
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/teams', teamsRoutes);
app.use('/projects', projectsRouters);

export default app;
