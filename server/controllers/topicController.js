const GroupSubmission = require("../models/groupSubmission");
const res = require("express/lib/response");
const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");

const getAllTopic = asyncHandler(async (req, res) => {
  const topics = await GroupSubmission.find({});

  res.json(topics);
});

const updateTopic = asyncHandler(async (req, res) => {
  const { status } = req.body;

  const topics = await GroupSubmission.findById(req.params.id);

  // if (topics.student.toString() !== req.student._id.toString()) {
  //   res.status(401);
  //   throw new Error("Cannot perform this action");
  // }

  if (topics) {
    topics.status = status;

    const updatedTopics = await topics.save();
    res.json(updatedTopics);
  } else {
    res.status(404);
    throw new Error("Marks not found");
  }
});

const getTopicId = asyncHandler(async (req, res) => {
  const topics = await GroupSubmission.findById(req.params.id);

  if (topics) {
    res.json(topics);
  } else {
    res.status(404).json({ message: "Marks not found" });
  }
});

module.exports = { getAllTopic, updateTopic, getTopicId };
