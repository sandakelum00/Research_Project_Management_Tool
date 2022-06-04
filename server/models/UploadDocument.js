const mongoose = require("mongoose");

const DocSchema = new mongoose.Schema(
  {
    fileName: {
      type: String,
      required: [true, "Please provide document"],
      minlength: 1,
      maxlength: 200,
      trim: true,
    },

    docTitle: {
      type: String,
      required: [true, "Please provide title"],
      minlength: 3,
      maxlength: 50,
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
      enum: ["presentation-template", "marking-scheme"],
      default: "presentation-template",
    },

    file_path: {
      type: String,
      required: true,
    },

    file_mimetype: {
      type: String,
      required: true,
    },

    file_size: {
      type: String,
      required: true,
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
