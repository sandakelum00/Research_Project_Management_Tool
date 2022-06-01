const asyncHandler = require("express-async-handler");
const res = require("express/lib/response");
const GroupSubmission = require("../models/groupSubmission");

const groupSubmission = asyncHandler(async(req, res) => {
    const {teamName, supervisor, cosupervisor, status} = req.body;

        if(!teamName, !supervisor, !cosupervisor) {
            res.status(400);
    throw new Error("Please fill all the fields");
        }
        else {
            const studentGroup = new GroupSubmission({ student: req.student._id, teamName, supervisor, cosupervisor, status})

            const submitGroup = await studentGroup.save();

            res.status(201).json(submitGroup);

    }
}
);

module.exports = { groupSubmission };