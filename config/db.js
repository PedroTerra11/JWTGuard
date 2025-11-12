const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Conectado com sucesso!");
  } catch (error) {
    console.error("Falha na conexão");
  }
};

module.exports = connectDB;
