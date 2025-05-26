const express = require('express')
require('dotenv').config()
const airoutes = require('./routes/ai.routes')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())
app.use('/ai',airoutes)


app.get('/',(req,res)=>{
  res.send("Hello my name is Shubhankar Kashyap")  
})



module.exports = app