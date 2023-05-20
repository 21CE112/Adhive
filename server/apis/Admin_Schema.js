const mongoose = require("mongoose");

const AdminSchema = mongoose.Schema({
  username: {
    type: String,
  },
  password: {
    type: String,
  },
  email: {
    type: String,
  },
});

const Admin = new mongoose.model("Admininfo", AdminSchema);

module.exports = Admin;