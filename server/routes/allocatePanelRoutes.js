const express = require("express");
const router = express.Router();

const {
  getAllPanelMembers,
  updatePanelMember,
  showStats,
} = require("../controllers/AllocatePanelController.js");

router.route("/").get(getAllPanelMembers);
router.route("/:id").put(updatePanelMember);
router.route("/stats").get(showStats);

module.exports = router;
