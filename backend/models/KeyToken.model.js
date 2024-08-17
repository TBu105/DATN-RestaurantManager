const mongoose = require("mongoose");

const DOCUMENT_NAME = "KeyToken";
const COLLECTION_NAME = "KeyTokens";

const KeyTokenSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user id"],
    },
    secretKey: {
      type: String,
      required: [true, "Please provide secret key"],
    },
    refreshToken: {
      type: String,
      // required: [true, "Please provide refresh token"],
    },
    refreshUsed: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

module.exports = mongoose.model(DOCUMENT_NAME, KeyTokenSchema);
