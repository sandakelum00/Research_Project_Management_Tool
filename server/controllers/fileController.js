const UploadDoc = require("../models/researchDocument");
const { NotFoundError } = require("../errors/index.js");
const path = require("path");
const researchDocument = require("../models/researchDocument");
const asyncHandler = require("express-async-handler");

const uploadDocument = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    const file = new UploadDoc({
      title,
      description,
      file_path: req.file.path,
      file_mimetype: req.file.mimetype,
    });

    const doc = await file.save();

    res.status(201).json({ doc });
  } catch (error) {
    next(error);
  }
};

const getAllDoc = asyncHandler(async (req, res) => {
  const docs = await researchDocument.find({ });
  res.json(docs);
});

const downloadDoc = async (req, res, next) => {
  try {
    const { id: docId } = req.params;

    const file = await UploadDoc.findOne({ _id: docId });

    if (!file) {
      const err = new NotFoundError(`No document with id :${docId}`);
      next(err);
    }

    res.set({
      "Content-Type": file.file_mimetype,
    });

    res.sendFile(path.join(__dirname, "..", file.file_path));
  } catch (error) {
    next(error);
  }
};

module.exports = {
  downloadDoc,
  uploadDocument,
  getAllDoc
};