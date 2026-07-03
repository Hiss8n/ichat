import mongoose from 'mongoose';
import User from './User.js';

const { Schema, model } = mongoose;

const contactSchema = new Schema(
  {
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    userRefId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    name: { type: String, trim: true, default: function () { return this.email; } },
  },
  { timestamps: true }
);

// Ensure owner exists before saving
contactSchema.pre('save', async function (next) {
  try {
    const ownerExists = await User.exists({ _id: this.owner });
    if (!ownerExists) return next(new Error('Owner user does not exist'));

    return next();
  } catch (err) {
    return next(err);
  }
});

const Contact = model('Contact', contactSchema);

export default Contact;
