require("dotenv").config();
const mongoose = require("mongoose");
const colors = require("colors");



const connectDB = async () => {
  try {
    // Attempt to connect to MongoDB
    const conn = await mongoose.connect(process.env.MONGO_URI)

    // Log successful connection
    console.log(colors.green.bold(`MongoDB Connected: ${conn.connection.host}`));
  } catch (error) {
    // Log error message with red text
    console.error(colors.red.bold(`Error: ${error.message}`));

    // Exit the process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
