import mongoose from 'mongoose';
import User from './User.js';

const { Schema, model } = mongoose;

const contactSchema = new Schema(
  {
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    contact: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    email: { type: String, required: true, trim: true, lowercase: true },
  },
  { timestamps: true }
);

// Ensure owner exists and resolve the contact by email before saving
contactSchema.pre('save', async function (next) {
  try {
    const ownerExists = await User.exists({ _id: this.owner });
    if (!ownerExists) return next(new Error('Owner user does not exist'));

    // Lookup contact by email and set the contact ObjectId
    const contactUser = await User.findOne({ email: this.email });
    if (!contactUser) return next(new Error('Contact user with this email does not exist'));

    this.contact = contactUser._id;

    return next();
  } catch (err) {
    return next(err);
  }
});

const Contact = model('Contact', contactSchema);

export default Contact;
