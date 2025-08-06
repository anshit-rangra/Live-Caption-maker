const aiModel = require("../services/ai.service")
const uploadFile = require("../services/cloud.service")
const postModel = require("../models/post.models")

const postItem = async(req, res) => {
    const file = await uploadFile(req.file, req.user.username+Date.now())
    const response = await aiModel(req.file)
    console.log(req.user)
    const post = await postModel.create({image:file.url, caption : response, user:req.user._id})

    res.json({message: post })
}

module.exports = {postItem}