import Message from '../model/Message.js';
import User from '../model/User.js';

export const sendMessage = async (req, res) => {
    const senderId = req.user && (req.user._id || req.user.id);
		const receiverId = req.params.id;
		const { text, image, video } = req.body;
       
	try {
		

		if (!senderId) return res.status(401).json({ message: 'Unauthorized' });
		if (!receiverId) return res.status(400).json({ message: 'Receiver id required' });

		/* const receiver = await User.findById(receiverId);
		if (!receiver) return res.status(404).json({ message: 'Receiver not found' });
 */
		const message = await Message.create({
			sender: senderId,
			receiver: receiverId,
			text: text || '',
			image: image || null,
			video: video || null
		});

        message.save();
/* 
		const populated = await message.populate('sender', 'name email').populate('receiver', 'name email');
 */
		return res.status(201).json({ message });
	} catch (err) {
		console.error('sendMessage error:', err);
		return res.status(500).json({ message: 'Server error' });
	}
};

export const getMessages = async (req, res) => {
	try {
		const me = req.user && (req.user._id || req.user.id);
		const otherId = req.params.id;

		if (!me) return res.status(401).json({ message: 'Unauthorized' });
		if (!otherId) return res.status(400).json({ message: 'Other user id required' });

		const messages = await Message.find({
			$or: [
				{ sender: me, receiver: otherId },
				{ sender: otherId, receiver: me }
			]
		})
			.sort({ createdAt: 1 })
			.populate('sender', 'name email')
			.populate('receiver', 'name email');

		if (!messages || messages.length === 0) {
			return res.json({ messages: null });
		}

		return res.json({ messages });
	} catch (err) {
		console.error('getMessages error:', err);
		return res.status(500).json({ message: 'Server error' });
	}
};

export default { sendMessage, getMessages };
