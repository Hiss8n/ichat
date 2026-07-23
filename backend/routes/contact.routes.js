import { Router } from 'express';
import { addContact, getMyContact, deleteContact, getSearchedContact } from '../controllers/contact.controllers.js';
import protectedRoute from '../middleware/auth.middleware.js';

const router = Router();

// Add a contact by email
router.post('/add', protectedRoute, addContact);

// Get authenticated user's contacts
router.get('/me', protectedRoute, getMyContact);

// Search contacts by name or email
router.get('/search',protectedRoute, getSearchedContact);

// Delete a contact by contact id
router.delete('/:id', protectedRoute, deleteContact);

export default router;

