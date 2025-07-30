const express = require('express')
const authRouter = require('./routes/auth.routes.js')
const cookieParser = require('cookie-parser')
const postRouter = require('./routes/post.routes.js')
const authMiddleware = require("./middlewares/auth.middleware.js")

const app = express()

app.use(express.json())
app.use(cookieParser())

app.use('/api/auth/', authRouter)
app.use('/api/post/', authMiddleware, postRouter)


module.exports = app;