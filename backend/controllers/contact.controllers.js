import Contact from '../model/Contact.js';
import User from '../model/User.js';

const buildContactPayload = (contact) => ({
  id: contact._id,
  email: contact.email,
  userId: contact.userRefId,
  name: contact.name || contact.email,
  createdAt: contact.createdAt,
});

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

    const enriched = contacts.map(buildContactPayload);

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

// get contacts by search term and prioritize the closest matches
export const getSearchedContact = async (req, res) => {
  try {
    const ownerId = req.user && (req.user._id || req.user.id);
    const {searchTerm }= (req.query)
     console.log("query terms:",searchTerm);
     console.log('owner',ownerId.toString());

    if (!ownerId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    if (!searchTerm) {
      return res.json({ contacts: [] });
    }

    const safeSearch = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(safeSearch, 'i');
    console.log('seach',searchTerm);
    console.log('owner',ownerId);

    const contacts = await Contact.find({
      owner:ownerId,
      $or: [
    { name: { $regex: searchTerm, $options: "i" } },
    {
      $expr: {
        $regexMatch: {
          input: {
            $arrayElemAt: [
              { $split: ["$email", "@"] },
              0
            ]
          },
          regex: searchTerm,
          options: "i"
        }
      }
    },
    
  ],
    }).select("name email avatar").limit(5).sort({ createdAt: -1 });

    const normalizedQuery = searchTerm.toLowerCase();
    const enriched = contacts
      .map(buildContactPayload)
      .sort((a, b) => {
        const aName = (a.name || '').toLowerCase();
        const bName = (b.name || '').toLowerCase();
        const aEmail = (a.email || '').toLowerCase();
        const bEmail = (b.email || '').toLowerCase();

        const score = (value) => {
          if (value === normalizedQuery) return 3;
          if (value.startsWith(normalizedQuery)) return 2;
          if (value.includes(normalizedQuery)) return 1;
          return 0;
        };

        return score(bName) - score(aName) || score(bEmail) - score(aEmail);
      });
  
    return res.json({ contacts: enriched });
  } catch (error) {
    console.error('getSearchedContact error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

export default { addContact, getMyContact, deleteContact, getSearchedContact };
