const express = require("express");
const {
  getMarks,
  addMarks,
  updateMarks,
  deleteMarks,
  getMarkId,
} = require("../controllers/marksController.js");
const { protect } = require("../middleware/authStaffMiddleware.js");

const router = express.Router();

router.route("/").get(protect, getMarks);
router.route("/addMarks").post(protect, addMarks);
router
  .route("/:id")
  .get(getMarkId)
  .put(protect, updateMarks)
  .delete(protect, deleteMarks);

module.exports = router;
