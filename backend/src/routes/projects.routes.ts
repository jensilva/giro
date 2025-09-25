import { Router } from 'express';
import { getProjects, getProject, createProject, editProject, deleteProject, getMyProjects } from '../controllers/projects.controller.js';
import {requireAuth} from '../middleware/auth.js';

const router = Router();


router.get("/", requireAuth, getProjects)
router.post("/", requireAuth, createProject)

router.get("/mine", requireAuth, getMyProjects)

router.get("/:id", requireAuth, getProject)
router.put("/:id", requireAuth, editProject)
router.delete("/:id", requireAuth, deleteProject)




export default router;
