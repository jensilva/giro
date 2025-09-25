import { Router } from 'express';
import { getUsers, getManagers, getUser, createUser, editUser, deleteUser } from '../controllers/user.controller.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();


router.get("/", requireAuth, getUsers)

router.get("/managers", requireAuth, getManagers)

router.get("/:id", requireAuth, getUser)

router.post("/", requireAuth, createUser)

router.put("/:id", requireAuth, editUser)

router.delete("/:id", requireAuth, deleteUser)


export default router;
