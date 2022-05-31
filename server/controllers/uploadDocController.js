const UploadDoc = require("../models/UploadDocument.js");
const { BadRequestError, NotFoundError } = require("../errors/index.js");
const path = require("path");

const uploadDocument = async (req, res, next) => {
  try {
    const { docTitle, docDescription, docType } = req.body;

    if (!docTitle || !docDescription || !docType) {
      const err = new BadRequestError("Please provide all values");
      next(err);
    }

    const file = new UploadDoc({
      docTitle,
      docDescription,
      docType,
      fileName: req.file.originalname,
      file_path: req.file.path,
      file_mimetype: req.file.mimetype,
      file_size: fileSizeFormatter(req.file.size, 2),
      createdBy: req.admin.adminId,
    });

    const doc = await file.save();

    res.status(201).json({ doc });
  } catch (error) {
    next(error);
  }
};

const getAllDoc = async (req, res, next) => {
  try {
    const { docType, sort, search } = req.query;

    const queryObject = {
      createdBy: req.admin.adminId,
    };

    //search from docType
    if (docType && docType !== "all") {
      queryObject.docType = docType;
    }

    //search from docTitle
    if (search) {
      queryObject.docTitle = { $regex: search, $options: "i" };
    }

    let result = UploadDoc.find(queryObject);

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

    const docs = await result;

    const totalDocs = await UploadDoc.countDocuments(queryObject);

    const numOfPages = Math.ceil(totalDocs / limit);

    res.status(200).json({ docs, totalDocs, numOfPages });
  } catch (error) {
    next(error);
  }
};

const updateDoc = async (req, res, next) => {
  try {
    const { id: docId } = req.params;
    const { docTitle, docDescription, docType } = req.body;

    if (!docTitle || !docDescription || !docType) {
      const err = new BadRequestError("Please provide all values");
      next(err);
    }

    const doc = await UploadDoc.findOne({ _id: docId });

    if (!doc) {
      const err = new NotFoundError(`No document with id :${docId}`);
      next(err);
    }

    const UpdatedDoc = await UploadDoc.findOneAndUpdate(
      { _id: docId },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({ UpdatedDoc });
  } catch (error) {
    next(error);
  }
};

const deleteDoc = async (req, res, next) => {
  try {
    const { id: docId } = req.params;

    const doc = await UploadDoc.findOne({ _id: docId });

    if (!doc) {
      const err = new NotFoundError(`No document with id :${docId}`);
      next(err);
    }

    await doc.remove();

    res.status(200).json({ msg: "Success! document removed" });
  } catch (error) {
    next(error);
  }
};

//file formatter
const fileSizeFormatter = (bytes, decimal) => {
  if (bytes === 0) {
    return "0 Bytes";
  }
  const dm = decimal || 2;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "YB", "ZB"];
  const index = Math.floor(Math.log(bytes) / Math.log(1000));
  return (
    parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + " " + sizes[index]
  );
};

module.exports = { uploadDocument, getAllDoc, updateDoc, deleteDoc };
