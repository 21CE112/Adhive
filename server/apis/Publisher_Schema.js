const mongoose = require("mongoose");

const publiserSchema = mongoose.Schema({
  username: {
    type: String,
  },
  password: {
    type: String,
  },
  email: {
    type: String,
  },
  profileImage: { 
    type: String,
  },
});

const Publisher = new mongoose.model("publiserinfo", publiserSchema);

module.exports = Publisher;
