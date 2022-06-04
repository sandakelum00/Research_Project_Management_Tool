const express = require("express");
const {
  registerStudent,
  authStudent,
  updateStudentProfile,
} = require("../controllers/studentController");

const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/registerStudent").post(registerStudent);
router.route("/loginStudent").post(authStudent);
router.route("/profileStudent").put(protect, updateStudentProfile);

module.exports = router;
