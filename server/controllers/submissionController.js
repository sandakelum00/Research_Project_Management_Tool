const asyncHandler = require("express-async-handler");
const res = require("express/lib/response");
const GroupSubmission = require("../models/groupSubmission");
const Student = require("../models/StudentModel");

const getSubmissions = asyncHandler(async (req, res) => {
  const submissions = await GroupSubmission.find({ student: req.student._id });
  res.json(submissions);
});

const groupSubmission = asyncHandler(async (req, res) => {
  const { LeaderNo, title, supervisor, cosupervisor, status, panelMember } = req.body;
 
    if ((!title, !supervisor, !cosupervisor)) {
      res.status(400);
      throw new Error("Please fill all the fields");
    } else {
      const studentGroup = new GroupSubmission({
        student: req.student._id,
        LeaderNo,
        title,
        supervisor,
        cosupervisor,
        status,
        panelMember
      });

      const submitGroup = await studentGroup.save();

      res.status(201).json(submitGroup);
    }
});

const deleteSubmission = asyncHandler(async (req, res) => {
  const submission = await GroupSubmission.findById(req.params.id);

  if (submission.student.toString() !== req.student._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action");
  }

  if (submission) {
    await submission.remove();
    res.json({ message: "Submission Deleted" });
  } else {
    res.status(404);
    throw new Error("Submission not found");
  }
});

module.exports = { groupSubmission, getSubmissions, deleteSubmission };
