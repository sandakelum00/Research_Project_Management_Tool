const express = require("express");
const router = express.Router();

const {getAllTopic, updateTopic,getTopicId} = require ("../controllers/topicController");

router.route("/").get(getAllTopic);
router.route("/:id").put(updateTopic);
router.route("/:id").get(getTopicId)

module.exports = router;