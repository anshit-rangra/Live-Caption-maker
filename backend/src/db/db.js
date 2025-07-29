const mongoose = require('mongoose')

async function connectDB(){
    await mongoose.connect(process.env.MONGODB_URI)
}

module.exports = connectDB