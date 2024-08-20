const mongoose = require("mongoose");

const DOCUMENT_NAME = "Table";
const COLLECTION_NAME = "Tables";

const TableSchema = new mongoose.Schema(

    {
        // Số bàn
        number: {
            type: Number,
            required: [true, "Please provide table number"],
        },
        // Branch mà bàn thuộc về
        branchId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Branch",
            required: [true, "Please provide branch id"],
        },
        creatorName: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Please provide creator name"],
        },
        // Trạng thái của bàn
        status: {
            type: String,
            default: false,
            required: true,
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

module.exports = mongoose.model(DOCUMENT_NAME, TableSchema);
