const express = require("express");
const {
  groupSubmission,
  getSubmissions,
  deleteSubmission
} = require("../controllers/submissionController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/submitGroup").post(protect, groupSubmission);
router.route("/submissions").get(protect, getSubmissions);
router
  .route("/:id")
  .delete(protect, deleteSubmission);
module.exports = router;