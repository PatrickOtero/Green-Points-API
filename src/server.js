require('dotenv').config()
const express = require('express')
const cors = require('cors')
const generalRoutes = require('./routes/generalRoutes')
const companyRoutes = require('./routes/companyRoutes')
const individualRoutes = require('./routes/individualRoutes')

const app = express()

app.use(express.json())
app.use(cors())
app.use(generalRoutes)
app.use(companyRoutes)
app.use(individualRoutes)

module.exports = app
