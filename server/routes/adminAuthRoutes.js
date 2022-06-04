const express = require("express");
const router = express.Router();

const {
  register,
  login,
  update,
} = require("../controllers/adminAuthController.js");

const authenticateAdmin = require("../middleware/adminAuth.js");

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/update").put(authenticateAdmin, update);

module.exports = router;
