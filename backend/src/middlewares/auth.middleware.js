const jwt = require("jsonwebtoken")
const userModel = require("../models/auth.models")

const authMiddleware = async (req, res, next) => {
    const {token} = req.cookies;

    if(!token){
        return res.status(401).json({message: "User is not signed in yet"})
    }

    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY)
        const user = await userModel.findOne({_id: decoded.id})
        if(!user){
            return res.status(401).json({message: "User not found !"})
        }
        req.user = user;
        next()

    } catch (error) {
        return res.json({message: "Invalid token"})
    }
}

module.exports = authMiddleware;