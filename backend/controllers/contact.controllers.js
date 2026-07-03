import Contact from '../model/Contact.js';
import User from '../model/User.js';


// Add a contact for the authenticated user by email
export const addContact = async (req, res) => {
  try {
    const ownerId = req.user && (req.user._id || req.user.id);
    const { email, name } = req.body;
    
    if (!ownerId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const normalizedEmail = (email || '').trim().toLowerCase();
    if (!normalizedEmail) {
      return res.status(400).json({ message: 'Email is required' });
    }

    // Ensure the contact user exists
    const contactUser = await User.findOne({ email: normalizedEmail });

    if (!contactUser) return res.status(404).json({ message: 'This contact is not using iChat,please invite them.' });

    // Prevent adding self as contact
    if (String(contactUser._id) === String(ownerId)) {
      return res.status(400).json({ message: 'Cannot add yourself as a contact' });
    }

    // Prevent duplicate contact entries for this owner (by userRefId or email)
    const duplicate = await Contact.findOne({
      owner: ownerId,
      $or: [
        { userRefId: contactUser._id },
        { email: normalizedEmail }
      ]
    });

    if (duplicate) return res.status(409).json({ message: 'Contact already added' });

    const contact = await Contact.create({
      userRefId: contactUser._id,
      owner: ownerId,
      email: contactUser.email,
      name: name ? name.trim() : contactUser.name || contactUser.email,
    });

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

    const contacts = await Contact.find({ owner: ownerId }).sort({ createdAt: -1 });

    if (!contacts || contacts.length === 0) {
      return res.json({ contacts: null });
    }

    const enriched = contacts.map((c) => ({
      id: c._id,
      email: c.email,
      name: c.name || c.email,
      createdAt: c.createdAt,
    }));

    return res.json({ contacts: enriched });
  } catch (err) {
    console.error('getMyContact error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const deleteContact = async (req, res) => {
  try {
    const ownerId = req.user && (req.user._id || req.user.id);
    const contactId = req.params.id;

    if (!ownerId) return res.status(401).json({ message: 'Unauthorized' });
    if (!contactId) return res.status(400).json({ message: 'Contact id required' });

    const contact = await Contact.findById(contactId);
    if (!contact) return res.status(404).json({ message: 'Contact not found' });

    if (String(contact.owner) !== String(ownerId)) {
      return res.status(403).json({ message: 'Not allowed to delete this contact' });
    }

    await Contact.deleteOne({ _id: contactId });

    return res.json({ message: 'Contact deleted' });
  } catch (err) {
    console.error('deleteContact error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

export default { addContact, getMyContact, deleteContact };
