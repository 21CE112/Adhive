const mongoose = require("mongoose");

const advertiserSchema = mongoose.Schema({
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

const Advertiser = new mongoose.model("advertiserinfo", advertiserSchema);

module.exports = Advertiser;
