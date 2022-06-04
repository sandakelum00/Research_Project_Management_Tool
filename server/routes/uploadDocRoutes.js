const express = require("express");
const router = express.Router();
const { upload } = require("../helpers/filehelper.js");

const {
  uploadDocument,
  getAllDoc,
  updateDoc,
  deleteDoc,
  downloadDoc,
} = require("../controllers/uploadDocController.js");

router.route("/").post(upload.single("file"), uploadDocument).get(getAllDoc);
router.route("/:id").delete(deleteDoc).put(updateDoc).get(downloadDoc);

module.exports = router;
