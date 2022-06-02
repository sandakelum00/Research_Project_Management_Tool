const mongoose = require("mongoose");

const groupSubmissionSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    supervisor: {
      type: String,
      required: true,
      unique: true,
    },
    cosupervisor: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: String,
      required: true,
      default : 'Pending'
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "StudentModel",
    },
  },
  {
    timeStamps: true,
  }
);

const GroupSubmission = mongoose.model("GroupSubmission", groupSubmissionSchema);

module.exports = GroupSubmission;
