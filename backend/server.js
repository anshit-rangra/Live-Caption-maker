require('dotenv').config()
const app = require('./src/app.js')
const connectDB = require('./src/db/db.js')


connectDB().then(() => {

    app.listen(3000, () => {
        console.log("Server is running on port 3000")
    })

}).catch(() => {
    console.log("Did not connect to database")
})