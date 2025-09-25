import { Router } from 'express';
import {signIn, signUp, logout, refresh, checkSession} from '../controllers/auth.controller.js';

const router = Router();

router.post("/sign-in", signIn)

router.post("/sign-up", signUp)

router.post("/logout", logout)

router.post('/refresh-token', refresh);

router.get('/check-session', checkSession);


export default router;
