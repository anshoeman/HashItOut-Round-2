const express = require("express");
const app = express();
const connectDb = require("./database/connectDb");
const cors = require("cors");
connectDb(); /*Mongodb connection function*/
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


const PORT = process.env.PORT || 5000;

app.use("/", require("./routes/api/Alien"));
app.use("/api/login", require("./routes/api/Admin"));

app.listen(PORT, () =>
  console.log(`Server connection established at port ${PORT}`)
);
