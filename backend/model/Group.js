import mongoose from "mongoose";

const groupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: false,
      maxLength:200,
      default:"No description yet"
    },

    image: {
      type: String,
      required:false,
      default:null
    },

    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

const Group = mongoose.model('Groups', groupSchema);

export default Group;