const authController = require("../controllers/controller");
const express = require('express');
const router = express.Router();

router.post("/register", authController.register);

router.get("/login", authController.login);

router.get("/authenticate", authController.authenticate);

module.exports = router;