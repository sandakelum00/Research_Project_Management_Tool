const mongoose = require("mongoose");

const groupSubmissionSchema = mongoose.Schema(
  {
    LeaderNo: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    supervisor: {
      type: String,
      required: true,
    },
    cosupervisor: {
      type: String,
      required: true,
    },
    status: {
      type: String, 
      default : 'Pending'
    },
    panelMember: {
      type: String, 
      default : 'None'
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "StudentModel",
    },
  },
  {
    timestamps: true,
  }
);

const GroupSubmission = mongoose.model("GroupSubmission", groupSubmissionSchema);

module.exports = GroupSubmission;
