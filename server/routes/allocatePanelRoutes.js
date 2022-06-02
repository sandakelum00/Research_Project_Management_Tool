const express = require("express");
const router = express.Router();

const {
  getAllPanelMembers,
  updatePanelMember,
} = require("../controllers/AllocatePanelController.js");

router.route("/").get(getAllPanelMembers);
router.route("/:id").put(updatePanelMember);

module.exports = router;
