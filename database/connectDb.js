const mongoose = require('mongoose');
const URI = "mongodb+srv://anshuman:anshuman@cluster0.ol334vo.mongodb.net/?retryWrites=true&w=majority"

const connectDB = async () => {
    try {
      await mongoose.connect(URI);
      console.log("MongoDB connection established");
      
    } catch (err) {
      console.log(err);
    }
  };  
  
module.exports = connectDB;