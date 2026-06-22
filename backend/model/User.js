import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const userSchema = new Schema(
	{
		name: { type: String, required: true, trim: true },
		email: { type: String, required: true, unique: true, lowercase: true, trim: true },
		password: { type: String, required: true },
		bio: { type: String, default: '' }
	},
	{ timestamps: true }
);

const User = model('User', userSchema);

export default User;
