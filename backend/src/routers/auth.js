const { Router } = require("express");
const loginController = require("../controllers/auth/login");
const checkController = require("../controllers/auth/check");
const logoutController = require("../controllers/auth/logout");
const signupController = require("../controllers/auth/signup");

const router = Router();

router.post("/login", loginController);
router.post("/check", checkController);
router.post("/logout", logoutController);
router.post("/signup", signupController);

module.exports = router;
