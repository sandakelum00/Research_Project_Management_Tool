const express = require("express");
const {
  registerStaff,
  loginStaff,
  updateStaffProfile,
} = require("../controllers/staffController.js");
const { protect } = require("../middleware/authStaffMiddleware.js");

const router = express.Router();

router.route("/registerStaff").post(registerStaff);
router.route("/loginStaff").post(loginStaff);
router.route("/updateStaff").put(protect, updateStaffProfile);

module.exports = router;
