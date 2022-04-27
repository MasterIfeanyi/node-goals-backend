const express = require("express");
const router = express.Router();
const {handleLogin} = require("../controllers/authorizationController")


router.post("/", handleLogin);


module.exports = router;