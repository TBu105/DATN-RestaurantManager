const mongoose = require("mongoose");

const DOCUMENT_NAME = "User";
const COLLECTION_NAME = "Users";

const UserSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["manager", "waiter", "chef", "cashier"],
      required: [true, "Please provide role"],
    },
    branch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
      required: [true, "Please provide branch"],
    },
    username: {
      type: String,
      required: [true, "Please provide username"],
    },
    password: {
      type: String,
      required: [true, "Please provide password"],
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

module.exports = mongoose.model(DOCUMENT_NAME, UserSchema);
