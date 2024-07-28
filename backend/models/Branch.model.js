const mongoose = require("mongoose");

const DOCUMENT_NAME = "Branch";
const COLLECTION_NAME = "Branches";

const BranchSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide branch name"],
      unique: [true, "This branch name is already taken"]
    },
    // tỉnh
    province: {
      type: String,
      required: [true, "Please provide province"],
    },
    city: {
      type: String,
      required: [true, "Please provide city"],
    },
    // quận
    district: {
      type: String,
    },
    // phường
    ward: {
      type: String,
      required: [true, "Please provide ward"],
    },
    street: {
      type: String,
      required: [true, "Please provide street"],
    },
    streetNumber: {
      type: String,
      required: [true, "Please provide street number"],
    },
    managerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      // required: [true, "Please provide manager id"],
    },
    isDelete: {
      type: Boolean,
      default: false,
    },
    isPublic: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

module.exports = mongoose.model(DOCUMENT_NAME, BranchSchema);
