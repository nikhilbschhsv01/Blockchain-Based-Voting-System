const express = require("express");

const startController = require("../controllers/polls/start");
const fetchController = require("../controllers/polls/fetch");
const statusController = require("../controllers/polls/status");
const endController = require("../controllers/polls/end");
const resetController = require("../controllers/polls/reset");
const votesController = require("../controllers/polls/votes");
const voteController = require("../controllers/polls/vote");
const { checkVoteability } = require("../controllers/polls/vote");

const router = express.Router();

router.get("/", fetchController);
router.get("/status", statusController);
router.get("/votes", votesController);

router.post("/start", startController);
router.post("/end", endController);
router.post("/reset", resetController);
router.post("/check-voteability", checkVoteability);
router.post("/vote", voteController);

module.exports = router;
