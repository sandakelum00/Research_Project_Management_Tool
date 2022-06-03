const express = require("express");
const router = express.Router();

const {
  getAllStudents,
  updateStudent,
  deleteStudent,
} = require("../controllers/studentsManageController.js");

router.route("/").get(getAllStudents);
router.route("/:id").delete(deleteStudent).put(updateStudent);

module.exports = router;
