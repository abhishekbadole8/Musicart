const mongoose = require("mongoose");

const connectDb = () => {
  try {
    const connect = mongoose.connect(process.env.MONGOOSE_CONNECTION);
    console.log(`Connection To Database Sucessfully`);
  } catch (error) {
    console.log(`Connection To Database Failed: ${error}`);
  }
};

module.exports = connectDb;
