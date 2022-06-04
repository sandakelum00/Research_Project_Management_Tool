const PanelMember = require("../models/AllocatePanel");
const { BadRequestError, NotFoundError } = require("../errors/index.js");
const mongoose = require("mongoose");
const moment = require("moment");

const getAllPanelMembers = async (req, res, next) => {
  try {
    const { status, sort, search } = req.query;

    const queryObject = {};

    //search from member states
    if (status && status !== "all") {
      queryObject.status = status;
    }

    //search from member it
    if (search) {
      queryObject.LeaderNo = { $regex: search, $options: "i" };
    }

    let result = PanelMember.find(queryObject);

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

    const panelMembers = await result;

    const totalPanelMembers = await PanelMember.countDocuments(queryObject);

    const numOfPages = Math.ceil(totalPanelMembers / limit);

    res.status(200).json({ panelMembers, totalPanelMembers, numOfPages });
  } catch (error) {
    next(error);
  }
};

const updatePanelMember = async (req, res, next) => {
  try {
    const { id: memberId } = req.params;
    const { status, panelMember } = req.body;

    if (!status || !panelMember) {
      const err = new BadRequestError("Please provide all values");
      next(err);
    }

    const panelmember = await PanelMember.findOne({ _id: memberId });

    if (!panelmember) {
      const err = new NotFoundError(`No panel with id :${memberId}`);
      next(err);
    }

    const updatedPanelMember = await PanelMember.findOneAndUpdate(
      { _id: memberId },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({ updatedPanelMember });
  } catch (error) {
    next(error);
  }
};

const showStats = async (req, res) => {
  let stats = await PanelMember.aggregate([
    { $group: { _id: "$status", count: { $sum: 1 } } },
  ]);

  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});

  const defaultStats = {
    pending: stats.Pending || 0,
    accept: stats.Accept || 0,
    reject: stats.Reject || 0,
  };

  let monthlyActivity = await PanelMember.aggregate([
    {
      $group: {
        _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": -1, "_id.month": -1 } },
    { $limit: 6 },
  ]);

  monthlyActivity = monthlyActivity
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;
      const date = moment()
        .month(month - 1)
        .year(year)
        .format("MMM Y");
      return { date, count };
    })
    .reverse();

  res.status(200).json({ defaultStats, monthlyActivity });
};

module.exports = { getAllPanelMembers, updatePanelMember, showStats };
