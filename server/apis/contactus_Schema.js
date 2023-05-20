const mongoose = require("mongoose");

const contactusSchema = mongoose.Schema({
  username: {
    type: String,
  },

  email: {
    type: String,
  },
 message: {
    type: String,
  },
});

const contactus = new mongoose.model("contactus", contactusSchema);

module.exports = contactus;
