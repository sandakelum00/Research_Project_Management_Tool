const express = require("express");
const router = express.Router();

const {
  getAllPanel,
  updatePanel,
} = require("../controllers/PanelMemberController.js");

router.route("/").get(getAllPanel);
router.route("/:id").put(updatePanel);

module.exports = router;
