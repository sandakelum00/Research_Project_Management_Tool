//Marking model
const mongoose = require("mongoose");

const marksSchema = mongoose.Schema(
  {
    year: {
      type: String,
      required: true,
    },

    groupid: {
      type: String,
      required: true,
    },

    mark: {
      type: String,
      required: true,
    },

    staff: {
      //can use according to the requirements
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Staff",
    },
  },

  {
    timestamps: false,
  }
);

const Marks = mongoose.model("Marks", marksSchema);

module.exports = Marks;
