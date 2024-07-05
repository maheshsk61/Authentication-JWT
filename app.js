const express = require('express')
const app = express()
const port = 2000
const routes = require('./routes/authRoutes.js')
const dbConnection = require('./db/db.js')
//calling db connection
dbConnection()
//middlewares
app.use(express.json())
app.use("/api/user", routes)
//listen
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})