import { Router } from 'express';
import { sendMessage, getMessages } from '../controllers/message.controllers.js';
import protectedRoute from '../middleware/auth.middleware.js';

const router = Router();

// Send a message to user with id in params
router.post('/send/:email', protectedRoute, sendMessage);

// Get messages between authenticated user and user with id in params
router.get('/:email', protectedRoute, getMessages);

export default router;
