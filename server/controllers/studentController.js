const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");
const Student = require("../models/StudentModel");

const registerStudent = asyncHandler(async (req, res) => {
  const { fullName, studentId, email, password } = req.body;

  const studentExist = await Student.findOne({ studentId });

  if (studentExist) {
    res.status(400);
    throw new Error("Student already exists");
  }

  const student = await Student.create({
    fullName,
    studentId,
    email,
    password,
  });

  if (student) {
    res.status(201).json({
      _id: student._id,
      fullName: student.fullName,
      studentId: student.studentId,
      email: student.email,
      token: generateToken(student._id),
    });
  } else {
    res.status(400);
    throw new Error("Error occured! ");
  }
});

const authStudent = asyncHandler(async (req, res) => {
  const { studentId, password } = req.body;

  const student = await Student.findOne({ studentId });

  if (student && (await student.matchPassword(password))) {
    res.json({
      _id: student._id,
      fullName: student.fullName,
      studentId: student.studentId,
      email: student.email,
      token: generateToken(student._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Id or Password!");
  }
});

const updateStudentProfile = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.student._id);

  if (student) {
    student.fullName = req.body.fullName || student.fullName;
    student.studentId = req.studentId || student.studentId
    student.email = req.body.email || student.email;

    if (req.body.password) {
      student.password = req.body.password;
    }

    const updatedStudent = await student.save();

    res.json({
      _id: updatedStudent._id,
      fullName: updatedStudent.fullName,
      studentId: updatedStudent.studentId,
      email: updatedStudent.email,
      token: generateToken(updatedStudent._id),
    });
  } else {
    res.status(404);
    throw new Error("Student not found!");
  }
});

module.exports = { registerStudent, authStudent, updateStudentProfile}
