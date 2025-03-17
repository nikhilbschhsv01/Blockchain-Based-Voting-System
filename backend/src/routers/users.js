const express = require("express");
const notVerifiedController = require("../controllers/users/not-verified");
const verifyController = require("../controllers/users/verify");
const deleteController = require("../controllers/users/delete");

const router = express.Router();

router.get("/all", notVerifiedController);
router.post("/verify", verifyController);
router.delete("/delete/:id", deleteController);

module.exports = router;
