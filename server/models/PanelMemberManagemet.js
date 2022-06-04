const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const PanelMemberSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "Please provide name"],
      minlength: 3,
      maxlength: 20,
      trim: true,
    },

    userEmail: {
      type: String,
      required: [true, "Please provide email"],
      validate: {
        validator: validator.isEmail,
        message: "Plese provide valid email",
      },
      unique: true,
    },

    userPassword: {
      type: String,
      required: [true, "Please provide password"],
      minlength: 3,
      select: false,
    },
  },
  { timestamps: true }
);

PanelMemberSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

PanelMemberSchema.methods.createJWT = function () {
  return jwt.sign({ adminId: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

PanelMemberSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

module.exports = mongoose.model("PanelMember", PanelMemberSchema);
