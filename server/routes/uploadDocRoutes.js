const express = require("express");
const router = express.Router();

const {
  uploadDocument,
  getAllDoc,
  updateDoc,
  deleteDoc,
} = require("../controllers/uploadDocController.js");

router.route("/").post(uploadDocument).get(getAllDoc);
router.route("/:id").delete(deleteDoc).patch(updateDoc);

module.exports = router;
