import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const messageSchema = new Schema(
  {
    sender: { type: String, required: true },
    receiver: { type:String, required: true },
    text: { type: String, default: '' },
    image: { type: String, default: null },
    video: { type: String, default: null }
  },
  { timestamps: true }
);

const Message = model('Message', messageSchema);

export default Message;
