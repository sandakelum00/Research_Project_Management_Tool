const Staff = require("../models/StaffManage");
const { BadRequestError, NotFoundError } = require("../errors/index.js");

const getAllStaff = async (req, res, next) => {
  try {
    const { userposition, sort, search } = req.query;

    const queryObject = {};

    //search from staff position
    if (userposition && userposition !== "all") {
      queryObject.userposition = userposition;
    }

    //search from staff name
    if (search) {
      queryObject.username = { $regex: search, $options: "i" };
    }

    let result = Staff.find(queryObject);

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
    const limit = Number(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    result = result.skip(skip).limit(limit);

    const staffs = await result;

    const totalStaff = await Staff.countDocuments(queryObject);

    const numOfPages = Math.ceil(totalStaff / limit);

    res.status(200).json({ staffs, totalStaff, numOfPages });
  } catch (error) {
    next(error);
  }
};

const updateStaff = async (req, res, next) => {
  try {
    const { id: staffId } = req.params;
    const {
      username,
      useremail,
      userposition,
      researchInterestingAreas,
      department,
    } = req.body;

    if (
      !username ||
      !useremail ||
      !userposition ||
      !researchInterestingAreas ||
      !department
    ) {
      const err = new BadRequestError("Please provide all values");
      next(err);
    }

    const staff = await Staff.findOne({ _id: staffId });

    if (!staff) {
      const err = new NotFoundError(`No staff with id :${docId}`);
      next(err);
    }

    const updatedStaff = await Staff.findOneAndUpdate(
      { _id: staffId },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({ updatedStaff });
  } catch (error) {
    next(error);
  }
};

const deleteStaff = async (req, res, next) => {
  try {
    const { id: staffId } = req.params;

    const staff = await Staff.findOne({ _id: staffId });

    if (!staff) {
      const err = new NotFoundError(`No staff with id :${docId}`);
      next(err);
    }

    await staff.remove();

    res.status(200).json({ msg: "Success! staff removed" });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllStaff, updateStaff, deleteStaff };
