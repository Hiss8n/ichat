import Message from '../model/Message.js';
import User from '../model/User.js';
import Contact from '../model/Contact.js';
import { io, getSocketIdByUserId } from '../utils/socket.js';

export const sendMessage = async (req, res) => {
    const senderId = req.user && (req.user._id || req.user.id);
		const receiverEmail = req.params.email;
		const { text, image, video } = req.body;
       
	try {
		

		const user=await User.findById(senderId);

		if (!senderId) return res.status(401).json({ message: 'Unauthorized' });
		if (!receiverEmail) return res.status(400).json({ message: 'Receiver id required' });

		// Try to resolve receiver as a Contact first, then as a User
	
		const contactReceiver = await User.find({email:receiverEmail});
		if(!contactReceiver) return res.status(400).json({ message: 'This contact is not using iChat,INVITE!' });

	
		const message = await Message.create({
			sender: user.email,
			receiver: receiverEmail,
			text: text || '',
			image: image || null,
			video: video || null
		});

		// If the receiver maps to a registered user, emit the message to their socket
		
		const socketId = getSocketIdByUserId(String(contactReceiver._id)) 
		if (socketId) {
			io.to(socketId).emit('newMessage', message);
		}


		return res.status(201).json({ message });
	} catch (err) {
		console.error('sendMessage error:', err);
		return res.status(500).json({ message: 'Server error' });
	}
};

export const getMessages = async (req, res) => {
	try {
		const me = req.user && (req.user._id || req.user.id);
		const email = req.params.email;
	

	/* 	const mySelf=await Contact.find{_id:{}} */

		if (!me) return res.status(401).json({ message: 'Unauthorized' });
		const user=await User.findById(me)
		if (!email) return res.status(400).json({ message: 'Other user id required' });

		const messages = await Message.find({
			$or: [
				{ sender: user.email, receiver: email },
				 { sender: email, receiver: user.email } 
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
