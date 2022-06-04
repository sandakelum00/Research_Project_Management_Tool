const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken.js");
const Staff = require("../models/staffModel.js");

const registerStaff = asyncHandler(async (req, res) => {
  const {
    username,
    useremail,
    userposition,
    userpassword,
    researchInterestingAreas,
    department,
  } = req.body;

  const userAlreadyExists = await Staff.findOne({ useremail });

  if (userAlreadyExists) {
    res.status(400);
    throw new Error("User Already Exists!");
  }

  const staff = await Staff.create({
    username,
    useremail,
    userposition,
    userpassword,
    researchInterestingAreas,
    department,
  });

  if (staff) {
    res.status(201).json({
      _id: staff._id,
      username: staff.username,
      useremail: staff.useremail,
      userposition: staff.userposition,
      researchInterestingAreas: staff.researchInterestingAreas,
      department: staff.department,

      token: generateToken(staff._id),
    });
  } else {
    res.status(400);
    throw new Error("Error.....Something went wrong!");
  }
});

const loginStaff = asyncHandler(async (req, res) => {
  const { useremail, userpassword } = req.body;

  const staff = await Staff.findOne({ useremail });

  if (staff && (await staff.matchThePasswords(userpassword))) {
    res.json({
      _id: staff._id,
      username: staff.username,
      useremail: staff.useremail,
      userposition: staff.userposition,
      researchInterestingAreas: staff.researchInterestingAreas,
      department: staff.department,
      token: generateToken(staff._id),
    });
  } else {
    res.status(400);
    throw new Error("Error.....Wrong email or password!");
  }
});

const updateStaffProfile = asyncHandler(async (req, res) => {
  const staff = await Staff.findById(req.staff._id);

  if (staff) {
    staff.username = req.body.username || staff.username;
    staff.useremail = req.body.useremail || staff.useremail;
    staff.userposition = req.body.userposition || staff.userposition;
    staff.researchInterestingAreas =
      req.body.researchInterestingAreas || staff.researchInterestingAreas;
    staff.department = req.body.department || staff.department;

    if (req.body.userpassword) {
      staff.userpassword = req.body.userpassword;
    }

    const updatestaff = await staff.save();

    res.json({
      _id: updatestaff._id,
      username: updatestaff.username,
      useremail: updatestaff.useremail,
      userposition: updatestaff.userposition,
      researchInterestingAreas: staff.researchInterestingAreas,
      department: staff.department,
      token: generateToken(updatestaff._id),
    });
  } else {
    res.status(404);
    throw new Error("Error.....user not found!");
  }
});

module.exports = { registerStaff, loginStaff, updateStaffProfile };
