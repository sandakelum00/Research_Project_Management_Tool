const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const studentGroupSchema = mongoose.Schema(
  {
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
  },
  {
    timeStamps: true,
  }
);

const StudentGroup = mongoose.model("StudentGroup", studentGroupSchema);

module.exports = StudentGroup;
