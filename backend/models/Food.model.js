const mongoose = require("mongoose");

const DOCUMENT_NAME = "Food";
const COLLECTION_NAME = "Foods";

const FoodSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Please enter food name"] },
    description: { type: String },
    price: { type: Number, required: [true, "Please enter food price"] },
    category: { type: String, required: [true, "Please enter food category"] },
    branchId: {
      type: [Schema.Types.ObjectId],
      ref: "Branch",
      required: [true, "Please enter branch id"],
    },
    // Thêm nó sau khi ta tạo authen
    // userId: {
    //   type: [Schema.Types.ObjectId],
    //   ref: "User",
    //   required: [true, "Please enter user id"],
    // },
    status: {
      type: String,
      enum: ["best seller", "new", "loved", "normal"],
      default: "normal",
    },
    isDisable: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

module.exports = mongoose.model(DOCUMENT_NAME, FoodSchema);
