const mongoose = require("mongoose");
const AlienSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  Age: {
    type: Number,
    required: true,
  },
  nativePlanet: {
    type: String,
    required: true,
  },
  Weight: {
    type: String,
    required: true,
  },
  Height: {
    type: String,
    required: true,
  },
  Language: {
    type: String,
    required: true,
  },
});

module.exports = Alient = mongoose.model("Alien", AlienSchema);
