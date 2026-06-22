import jwt from 'jsonwebtoken';
import User from '../model/User.js';

const JWT_SECRET = process.env.JWT_SECRET || 'secretkey';

export const protectedRoute = async (req, res, next) => {
	try {
		const authHeader = req.headers.authorization || req.headers.Authorization;
		if (!authHeader || !authHeader.startsWith('Bearer ')) {
			return res.status(401).json({ message: 'No token provided' });
		}

		const token = authHeader.split(' ')[1];
		const decoded = jwt.verify(token, JWT_SECRET);

		// Verify user exists in DB
		const user = await User.findById(decoded.id).select('-password');
		if (!user) {
			return res.status(401).json({ message: 'User not found' });
		}

		req.user = user;
		return next();
	} catch (err) {
		console.error('Auth middleware error:', err);
		return res.status(401).json({ message: 'Invalid or expired token' });
	}
};

export default protectedRoute;
