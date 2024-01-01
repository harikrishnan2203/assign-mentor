const express = require("express")
const bodyparser = require("body-parser")
const AppRouter = require('./Routers/router')
const { connectToDatabase } = require("./Database/db")
const cors = require('cors')


const app = express()
const port = 8000;

app.use(bodyparser.json())
app.use(cors())

// Initiating connection with Database
connectToDatabase()

app.use('/', AppRouter)

app.listen(port, () => {
    console.log(`Server Listining the port ${port}`)
} )
