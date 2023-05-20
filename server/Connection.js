const mongoose = require("mongoose");
const chalk = require("chalk");
const mongoUrl =
  "mongodb+srv://Aryan0914:aryan0914@internshipproject.lyal5py.mongodb.net/?retryWrites=true&w=majority";

const connection = mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log(`${chalk.green("Connected to database")}`);
  })
  .catch((e) => console.log(e));
