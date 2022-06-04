const Panel = require("../models/PanelMemberManagemet");
const { BadRequestError, NotFoundError } = require("../errors/index.js");

const getAllPanel = async (req, res, next) => {
  try {
    const { sort, search } = req.query;

    const queryObject = {};

    //search from staff name
    if (search) {
      queryObject.userName = { $regex: search, $options: "i" };
    }

    let result = Panel.find(queryObject);

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

    const panels = await result;

    const totalPanel = await Panel.countDocuments(queryObject);

    const numOfPages = Math.ceil(totalPanel / limit);

    res.status(200).json({ panels, totalPanel, numOfPages });
  } catch (error) {
    next(error);
  }
};

const updatePanel = async (req, res, next) => {
  try {
    const { id: pId } = req.params;
    const { userName, userEmail } = req.body;

    if (!userName || !userEmail) {
      const err = new BadRequestError("Please provide all values");
      next(err);
    }

    const panel = await Panel.findOne({ _id: pId });

    if (!panel) {
      const err = new NotFoundError(`No staff with id :${pId}`);
      next(err);
    }

    const updatedPanel = await Panel.findOneAndUpdate({ _id: pId }, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ updatedPanel });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllPanel, updatePanel };
