const express = require("express");
const {
  createStudentGroup,
} = require("../controllers/studentGroupController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/createGroup").post(protect, createStudentGroup);

module.exports = router;
