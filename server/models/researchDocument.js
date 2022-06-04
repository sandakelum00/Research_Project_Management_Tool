const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide document"],
      minlength: 1,
      maxlength: 200,
      trim: true,
    },

    description: {
      type: String,
      required: [true, "Please provide title"],
      minlength: 3,
      maxlength: 20,
      trim: true,
    },
    file_path: {
      type: String,
      required: true,
    },

    file_mimetype: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('File', fileSchema);
