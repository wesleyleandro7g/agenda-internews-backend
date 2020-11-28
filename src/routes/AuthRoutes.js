const routes = require("express").Router;
const router = routes();

const AuthController = require("../controllers/AuthController");

router.post("/authenticate", AuthController.userAuthenticate);
router.post("/verify-token", AuthController.tokenVerify);

module.exports = router;
