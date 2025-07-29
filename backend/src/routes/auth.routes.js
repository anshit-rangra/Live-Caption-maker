const express = require('express')
const authcontrollers = require("../controllers/auth.controllers.js")

const router = express.Router()

router.route("/register").post(authcontrollers.register)

router.route("/login").post(authcontrollers.login)

router.route("/").get(authcontrollers.user)

module.exports = router