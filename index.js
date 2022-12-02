const express = require("express");
const app = express();
const connectDB = require("./database/connectDb");
const cors = require("cors");
connectDB(); /*Mongodb connection function*/

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())


app.get('/',(req,res)=>{
  return res.send('anshuman')
})

const PORT = process.env.PORT || 5000

app.use("/", require("./routes/api/Alien"));
app.use("/api/login", require("./routes/api/Admin"));

app.listen(PORT, () =>
  console.log(`Server connection established at port ${PORT}`)
);
