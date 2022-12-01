const express = require('express')
const app = express()
const connectDb = require('./database/connectDb')

app.use(express.json())
app.use(express.urlencoded({extended:false}))

connectDb();/*Mongodb connection function*/

const PORT = process.env.PORT || 5000


app.use('/api/alien',require('./routes/api/Alien'))
app.use('/api/login',require('./routes/api/Admin'))

app.listen(PORT,()=>console.log(`Server connection established at port ${PORT}`))


