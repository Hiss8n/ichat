import { Router } from 'express';
import { register, login, logout, getAllUsers } from '../controllers/auth.controllers.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/users', getAllUsers);
router.post('/logout', logout);

export default router;
