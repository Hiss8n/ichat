import Contact from '../model/Contact.js';
import User from '../model/User.js';

// Add a contact for the authenticated user by email
export const addContact = async (req, res) => {
  try {
    const ownerId = req.user && (req.user._id || req.user.id);
    const { email } = req.body;

    if (!ownerId) return res.status(401).json({ message: 'Unauthorized' });
    if (!email) return res.status(400).json({ message: 'Email is required' });

    // Ensure the contact user exists
    const contactUser = await User.findOne({ email: email.toLowerCase().trim() });
    if (!contactUser) return res.status(404).json({ message: 'Contact user not found' });

    // Prevent adding self as contact
    if (String(contactUser._id) === String(ownerId)) {
      return res.status(400).json({ message: 'Cannot add yourself as a contact' });
    }

    // Prevent duplicate contact entries by email for this owner
    const normalizedEmail = contactUser.email.toLowerCase().trim();
    const exists = await Contact.findOne({ owner: ownerId, email: normalizedEmail });
    if (exists) return res.status(409).json({ message: 'Contact already added' });

    const contact = await Contact.create({ owner: ownerId, email: normalizedEmail });

    return res.status(201).json({ contact });
  } catch (err) {
    console.error('addContact error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const getMyContact = async (req, res) => {
  try {
    const ownerId = req.user && (req.user._id || req.user.id);
    if (!ownerId) return res.status(401).json({ message: 'Unauthorized' });

    const contacts = await Contact.find({ owner: ownerId })
      .sort({ createdAt: -1 })
      .populate('owner', 'name email');

    if (!contacts || contacts.length === 0) {
      return res.json({ contacts: null });
    }

    return res.json({ contacts });
  } catch (err) {
    console.error('getMyContact error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

export default { addContact, getMyContact };
