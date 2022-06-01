const asyncHandler = require("express-async-handler");
const res = require("express/lib/response");
const StudentGroup = require("../models/StudentGroup");

const createStudentGroup = asyncHandler(async(req, res) => {
    const {teamName, s1sid, s1email, s2sid, s2email, s3sid, s3email, s4sid, s4email} = req.body;

        if(!s1sid, !s2sid, !s3sid, !s4sid) {
            res.status(400);
    throw new Error("Please fill all the fields");
        }
        else {
            const studentGroup = new StudentGroup({ student: req.student._id, teamName, s1sid, s1email, s2sid, s2email, s3sid, s3email, s4sid, s4email})

            const createdStudentGroup = await studentGroup.save();

            res.status(201).json(createdStudentGroup);

    }
}
);


module.exports = { createStudentGroup };