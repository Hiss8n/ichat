import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from "../model/User.js"


const JWT_SECRET = process.env.JWT_SECRET || 'secretkey';
const TOKEN_EXPIRES_IN = '7d';

export const register = async (req, res) => {
	try {
		const { name, email, password, bio } = req.body;
		if (!name || !email || !password) {
			return res.status(400).json({ message: 'all fields are required' });
		}

		const normalizedEmail = (email || '').trim().toLowerCase();
		const existing = await User.findOne({ email: normalizedEmail });
		if (existing) return res.status(409).json({ message: 'Email already in use' });

		const salt = await bcrypt.genSalt(10);
		const hashed = await bcrypt.hash(password, salt);

		const user = await User.create({ name, email: normalizedEmail, password: hashed, bio });

		const payload = { id: user._id };
		const token = jwt.sign(payload, JWT_SECRET, { expiresIn: TOKEN_EXPIRES_IN });

		const userObj = user.toObject();
		delete userObj.password;

		return res.status(201).json({ user: userObj, token,success:true });
	} catch (err) {
		console.error(err);
		return res.status(500).json({ message: 'Server error' });
	}
};

export const login = async (req, res) => {
	try {
		const { email, password } = req.body;
	
		if (!email || !password) return res.status(400).json({ message: 'all fields are required' });
		const normalizedEmail = (email || '').trim().toLowerCase();
		
		const user = await User.findOne({ email: normalizedEmail });
	
		if (!user) return res.status(401).json({ message: 'Invalid credentials' });

		const match = await bcrypt.compare(password, user.password);
		if (!match) return res.status(401).json({ message: 'Invalid credentials' });

		const payload = { id: user._id };
		const token = jwt.sign(payload, JWT_SECRET, { expiresIn: TOKEN_EXPIRES_IN });

		const userObj = user.toObject();
		delete userObj.password;

		return res.json({ user: userObj, token,success:true });
	} catch (err) {
		console.error(err);
		return res.status(500).json({ message: 'Server error' });
	}
};

export const getAllUsers = async (req, res) => {
	try {
		const users = await User.find({}).select('-password');
		return res.status(200).json({ users, success: true });
	} catch (err) {
		console.error(err);
		return res.status(500).json({ message: 'Server error' });
	}
};

export const logout = async (req, res) => {
	// With JWT stateless tokens, logout is handled client-side by discarding the token.
	// Optionally implement token revocation/blacklist if needed.
	return res.json({ message: 'Logged out' });
};

