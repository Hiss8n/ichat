import mongoose from 'mongoose';

import dotenv from 'dotenv'

dotenv.config({quiet:true})

const MONGODB_URL = process.env.MONGODB_URL;

const connectDB = async () => {
	try {
		await mongoose.connect(MONGODB_URL);
		console.log('MongoDB connected');
	} catch (err) {
		console.error('MongoDB connection error:', err);

		throw err;
        process.exit(1);
	}
};



export default connectDB;
