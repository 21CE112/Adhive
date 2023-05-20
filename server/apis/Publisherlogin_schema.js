const mongoose = require("mongoose");

const publiserloginSchema = mongoose.Schema({
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

const Publisher = new mongoose.model("publiserinfo", publiserloginSchema);

module.exports = Publisher;
