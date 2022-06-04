const asyncHandler = require("express-async-handler");
const res = require("express/lib/response");
const Marks = require("../models/marks.js");

const getMarks = asyncHandler(async (req, res) => {
  const marks = await Marks.find({ staff: req.staff._id });
  res.json(marks);
});

const addMarks = asyncHandler(async (req, res) => {
  const { year, groupid, mark } = req.body;

  if (!year || !groupid || !mark) {
    res.status(400);
    throw new Error("Cannot be empty fields");
  } else {
    const marks = new Marks({
      staff: req.staff._id,
      year,
      groupid,
      mark,
    });

    const addedMark = await marks.save();

    res.status(201).json(addedMark);
  }
});

const getMarkId = asyncHandler(async (req, res) => {
  const marks_ = await Marks.findById(req.params.id);

  if (marks_) {
    res.json(marks_);
  } else {
    res.status(404).json({ message: "Marks not found" });
  }
});

const updateMarks = asyncHandler(async (req, res) => {
  const { year, groupid, mark } = req.body;

  const marks = await Marks.findById(req.params.id);

  if (marks.staff.toString() !== req.staff._id.toString()) {
    res.status(401);
    throw new Error("Cannot perform this action");
  }

  if (marks) {
    marks.year = year;
    marks.groupid = groupid;
    marks.mark = mark;

    const updatedMarks = await marks.save();
    res.json(updatedMarks);
  } else {
    res.status(404);
    throw new Error("Marks not found");
  }
});

const deleteMarks = asyncHandler(async (req, res) => {
  const marks = await Marks.findById(req.params.id);

  if (marks.staff.toString() !== req.staff._id.toString()) {
    res.status(401);
    throw new Error("Cannot perform this action");
  }

  if (marks) {
    await marks.remove();
    res.json({ message: "Marks Deleted" });
  } else {
    res.status(404);
    throw new Error("Not found");
  }
});
module.exports = {
  getMarks,
  addMarks,
  updateMarks,
  deleteMarks,
  getMarkId
};
