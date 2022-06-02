const mongoose = require("mongoose");

const PanelSchema = new mongoose.Schema(
  {
    LeaderNo: {
      type: String,
      required: [true, "Please provide leader number"],
      minlength: 3,
      maxlength: 20,
      trim: true,
    },

    title: {
      type: String,
      required: [true, "Please provide title"],
      minlength: 3,
      maxlength: 20,
      trim: true,
    },

    supervisor: {
      type: String,
      required: [true, "Please provide supervisor"],
      minlength: 3,
      maxlength: 20,
      trim: true,
    },

    cosupervisor: {
      type: String,
      required: [true, "Please provide co-supervisor"],
      minlength: 3,
      maxlength: 20,
      trim: true,
    },

    status: {
      type: String,
      enum: ["Pending", "Accept", "Reject"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("groupsubmission", PanelSchema);
