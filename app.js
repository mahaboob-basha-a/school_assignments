const express = require('express')
const app = express()
const authRouter = require('./src/routes/auth')
const assignmentRouter = require('./src/routes/assignments')
require('dotenv').config()

const Port = process.env.PORT || 3000
app.use(express.json())
app.use('/api',authRouter)
app.use('/api',assignmentRouter)

app.listen(Port,()=>console.log('server running on port ',Port))