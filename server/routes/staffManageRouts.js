const express = require("express");
const router = express.Router();

const {
  getAllStaff,
  updateStaff,
  deleteStaff,
} = require("../controllers/staffManageController.js");

router.route("/").get(getAllStaff);
router.route("/:id").delete(deleteStaff).put(updateStaff);

module.exports = router;
