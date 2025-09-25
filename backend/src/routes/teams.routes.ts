import { Router } from 'express';
import {getTeams, getTeam, createTeam, updateTeam, deleteTeam} from '../controllers/teams.controller.js';
import {requireAuth} from '../middleware/auth.js';

const router = Router();


router.get("/", requireAuth, getTeams)

router.get("/:id", requireAuth, getTeam)

router.post("/", requireAuth, createTeam)

router.put("/:id", requireAuth, updateTeam)

router.delete("/:id", requireAuth, deleteTeam)


export default router;
