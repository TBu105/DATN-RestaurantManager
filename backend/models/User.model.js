const mongoose = require("mongoose");

const DOCUMENT_NAME = "User";
const COLLECTION_NAME = "Users";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please provide username"],
      unique: [true, "This username is already exists"],
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Please provide password"],
      minlength: [8, "Password must be at least 8 characters long"],
    },
    role: {
      type: String,
      enum: ["manager", "branchManager", "staff", "cooker", "cashier"],
      // required: [true, "Please provide user role"],
      default: "staff",
    },
    photo: {
      type: String,
      // required: [true, "Please provide user photo"],
      default:
        "https://res.cloudinary.com/deou3ybsb/image/upload/c_fill,h_300,w_300/v1/food/soclablwb0nm5ogpyucx.jpg?_a=BAMCg+WI0",
    },
    branchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
      // required: [true, "Please provide branchId"],
    },
    isDelete: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

module.exports = mongoose.model(DOCUMENT_NAME, UserSchema);
