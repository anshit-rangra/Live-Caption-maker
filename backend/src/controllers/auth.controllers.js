const userModel = require("../models/auth.models.js")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const register = async(req, res) => {
    const {username, password} = req.body;

    const userExists = await userModel.findOne({username})

    if(userExists){
        return res.json({message: "User is already exists !"})
    }

    const user = await userModel.create({
        username, password: await bcrypt.hash(password, 10)
    })

    const token = jwt.sign({id:user._id}, process.env.JWT_SECRET_KEY)

    res.cookie("token",token)

    res.json({message: "User is created sucessfully !"})
}

const login = async(req, res) => {
    const {username, password} = req.body;

    const userExists = await userModel.findOne({username})

    if(!userExists) return res.json({message: "User is not found !"})
    
    if(bcrypt.compare(password, userExists.password)){   
        const token = jwt.sign({id:userExists._id}, process.env.JWT_SECRET_KEY)
        res.cookie("token",token)
        return res.json({message: "User is loggedIn sucessfully !"})
    }else {
        return res.json({message:"Invalid password"})
    }
}

const user = async(req, res) => {
    const {token} = req.cookies;
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        const person = await userModel.findOne({_id:decoded.id}).select("-_id -__v")
        res.json({user: person})
    } catch (error) {
        return res.json({message: "Invalid token"})
    }
    

}

module.exports = {register, login, user}