const express = require("express");
const router = express.Router();

const {
  register,
  login,
  updateUser,
} = require("../controllers/adminAuthController.js");

const authenticateAdmin = require("../middleware/adminAuth.js");

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/updateUser").patch(authenticateAdmin, updateUser);

module.exports = router;
