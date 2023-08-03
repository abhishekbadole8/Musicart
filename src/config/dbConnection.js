const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGOOSE_CONNECTION);
    console.log(`Connection To Database Sucessfull`);
  } catch (error) {
    console.log(`Connection To Database Failed: ${error}`);
  }
};

module.exports = connectDb;
