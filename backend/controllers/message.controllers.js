import Message from '../model/Message.js';
import User from '../model/User.js';
import Contact from '../model/Contact.js';
import { io, getSocketIdByUserId,usersSocketMap } from '../utils/socket.js';


export const sendMessage = async (req, res) => {
    const senderId = req.user && (req.user._id || req.user.id);
		const receiverId = req.params.id;
		const { text, image, video } = req.body;
       
	try {
		

		if (!senderId) return res.status(401).json({ message: 'Unauthorized' });
		if (!receiverId) return res.status(400).json({ message: 'Receiver id required' });

		const user = await User.findById(senderId);
		if (!user) return res.status(401).json({ message: 'Unauthorized' });

		// Resolve receiver as a registered user.
		const contactReceiver = await User.findById(receiverId);
		if (!contactReceiver) return res.status(400).json({ message: 'This contact is not using iChat, INVITE!' });

		const message = await Message.create({
			sender: user._id || senderId,
			receiver: receiverId,
			text: text || '',
			image: image || null,
			video: video || null
		});
		// If the receiver maps to a registered user, emit the message to their socket

		
		
		const socketId = getSocketIdByUserId(String(contactReceiver._id));
		console.log("rid",socketId); 
		if (socketId) {
			io.to(socketId).emit('newMessage', message);
			console.log("emmiter running...")
		};
		return res.status(201).json({ message });
	} catch (err) {
		console.error('sendMessage error:', err);
		return res.status(500).json({ message: 'Server error' });
	}
};

export const getMessages = async (req, res) => {
	try {
		const me = req.user && (req.user._id || req.user.id);
		const receiverId = req.params.id;
	

	/* 	const mySelf=await Contact.find{_id:{}} */

		if (!me) return res.status(401).json({ message: 'Unauthorized' });
		const user=await User.findById(me)
		if (!receiverId) return res.status(400).json({ message: 'Other user id required' });

		const messages = await Message.find({
			$or: [
				{ sender: user._id, receiver: receiverId },
				 { sender: receiverId, receiver: user._id } 
			]
		})
			.sort({ createdAt: 1 })
			.populate('receiver', 'name email owner')
			.populate('sender', 'name email owner');

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
