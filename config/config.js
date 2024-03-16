const mongoose = require("mongoose");

require('dotenv').config()
//require("dotenv").config({ path: "./config/.env" });

// const { MONGO_URI } = require('./keys')

const dbConnection = async () => {
  try {
    console.log(process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Base de datos conectada con éxito");
  } catch (error) {
    console.error(error);
    throw new Error("Error a la hora de iniciar la base de datos");
  }
};

module.exports = {
  dbConnection,
};
