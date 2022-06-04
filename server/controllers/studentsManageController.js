const Student = require("../models/StudentsManage");
const { BadRequestError, NotFoundError } = require("../errors/index.js");

const getAllStudents = async (req, res, next) => {
  try {
    const { sort, search } = req.query;

    const queryObject = {};

    //search from student name
    if (search) {
      queryObject.fullName = { $regex: search, $options: "i" };
    }

    let result = Student.find(queryObject);

    //result sort

    if (sort === "latest") {
      result = result.sort("-createdAt");
    }
    if (sort === "oldest") {
      result = result.sort("createdAt");
    }
    if (sort === "a-z") {
      result = result.sort("position");
    }
    if (sort === "z-a") {
      result = result.sort("-position");
    }

    // setup pagination
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    result = result.skip(skip).limit(limit);

    const students = await result;

    const totalStudents = await Student.countDocuments(queryObject);

    const numOfPages = Math.ceil(totalStudents / limit);

    res.status(200).json({ students, totalStudents, numOfPages });
  } catch (error) {
    next(error);
  }
};

const updateStudent = async (req, res, next) => {
  try {
    const { id: sId } = req.params;
    const { fullName, email, studentId } = req.body;

    if (!fullName || !email || !studentId) {
      const err = new BadRequestError("Please provide all values");
      next(err);
    }

    const student = await Student.findOne({ _id: sId });

    if (!student) {
      const err = new NotFoundError(`No student with id :${sId}`);
      next(err);
    }

    const updatedStudent = await Student.findOneAndUpdate(
      { _id: sId },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({ updatedStudent });
  } catch (error) {
    next(error);
  }
};

const deleteStudent = async (req, res, next) => {
  try {
    const { id: sId } = req.params;

    const student = await Student.findOne({ _id: sId });

    if (!student) {
      const err = new NotFoundError(`No student with id :${sId}`);
      next(err);
    }

    await student.remove();

    res.status(200).json({ msg: "Success! student removed" });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllStudents, updateStudent, deleteStudent };
