const express = require("express");
const {
  groupSubmission,
} = require("../controllers/submissionController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/submitGroup").post(protect, groupSubmission);

module.exports = router;