const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const staffSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please provide name"],
      minlength: 3,
      maxlength: 50,
      trim: true,
    },

    useremail: {
      type: String,
      required: [true, "Please provide email"],
      validate: {
        validator: validator.isEmail,
        message: "Plese provide valid email",
      },
      unique: true,
    },

    userpassword: {
      type: String,
      required: [true, "Please provide password"],
      minlength: 3,
      select: false,
    },

    userposition: {
      type: String,
      enum: ["supervisor", "co-supervisor"],
      default: "supervisor",
    },

    researchInterestingAreas: {
      type: String,
      required: [true, "Please provide interesting"],
      minlength: 1,
      maxlength: 20,
      trim: true,
    },

    department: {
      type: String,
      required: [true, "Please provide department"],
      minlength: 1,
      maxlength: 20,
      trim: true,
    },
  },
  { timestamps: true }
);

staffSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

staffSchema.methods.createJWT = function () {
  return jwt.sign({ adminId: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

staffSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

module.exports = mongoose.model("Staff", staffSchema);
