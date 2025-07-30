const express = require("express")
const router = express.Router()
const postcontrollers = require("../controllers/post.controllers")
const upload = require("../middlewares/multer.middleware")

router.route("/").post(upload.single("file")  , postcontrollers.postItem)

module.exports = router