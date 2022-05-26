const asyncHandler = require("express-async-handler");
const StudentGroup = require("../models/StudentGroup");

const createStudentGroup = asyncHandler(async(req, res) => {
    const {} = req.body;

        if(!student1.sid || student2.sid || student3.sid || student4.sid) {
            res.status(400);
    throw new Error("Please fill all the fields");
        }
        else {
            const studentGroup = new StudentGroup({ sid, email })

            const createdStudentGroup = await studentGroup.save();

            res.status(201).json(createdStudentGroup);

    }
}
);


module.exports = { createStudentGroup };