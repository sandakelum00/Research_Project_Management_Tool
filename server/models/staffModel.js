const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const staffSchema = mongoose.Schema(
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

  {
    timestamps: true,
  }
);

staffSchema.pre("save", async function (next) {
  if (!this.isModified("userpassword")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.userpassword = await bcrypt.hash(this.userpassword, salt);
});

staffSchema.methods.matchThePasswords = async function (enteredUserPassword) {
  return await bcrypt.compare(enteredUserPassword, this.userpassword);
};

const StaffModel = mongoose.model("Staff", staffSchema);

module.exports = StaffModel;
