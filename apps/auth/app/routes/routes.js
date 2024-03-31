const authController = require("../controllers/controller");
const express = require('express');
const router = express.Router();

router.post("/register", authController.register);

router.post("/login", authController.login);

router.post("/authenticate", authController.authenticate);

module.exports = router;