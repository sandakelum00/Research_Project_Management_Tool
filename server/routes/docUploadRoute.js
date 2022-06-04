const express = require("express");
const router = express.Router();
const { upload } = require("../helpers/filehelper.js");

const {
  uploadDocument,
  downloadDoc,
  getAllDoc
} = require("../controllers/fileController");


router.route("/upload").post(upload.single("file"), uploadDocument);
router.route("/getAll").get(getAllDoc);
router.route("/:id").get(downloadDoc);

module.exports = router;