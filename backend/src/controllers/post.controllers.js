const aiModel = require("../services/ai.service")

const postItem = async(req, res) => {
    const {question} = req.body 
    const response = await aiModel(question)
    res.json({message: response.text })
}

module.exports = {postItem}