const mongoose = require("mongoose");

const DocSchema = new mongoose.Schema(
  {
    docTitle: {
      type: String,
      required: [true, "Please provide title"],
      minlength: 3,
      maxlength: 20,
      trim: true,
    },

    docDescription: {
      type: String,
      required: [true, "Please provide title"],
      minlength: 3,
      maxlength: 500,
      trim: true,
    },

    docType: {
      type: String,
      enum: ["presentation template", "marking scheme"],
      default: "pending",
    },

    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "Admin",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Document", DocSchema);
