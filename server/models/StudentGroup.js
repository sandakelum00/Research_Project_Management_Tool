const mongoose = require("mongoose");

const studentGroupSchema = mongoose.Schema(
  {
    teamName: {
      type: String,
      required: true,
      unique: true,
    },
    s1sid: {
      type: String,
      required: true,
      unique: true,
    },
    s2sid: {
      type: String,
      required: true,
      unique: true,
    },
    s3sid: {
      type: String,
      required: true,
      unique: true,
    },
    s4sid: {
      type: String,
      required: true,
      unique: true,
    },
    s1email: {
      type: String,
      unique: true,
    },
    s2email: {
      type: String,

      unique: true,
    },
    s3email: {
      type: String,

      unique: true,
    },
    s4email: {
      type: String,
      unique: true,
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "StudentModel",
    },
  },
  {
    timeStamps: true,
  },
  
);

const StudentGroup = mongoose.model("StudentGroup", studentGroupSchema);

module.exports = StudentGroup;
