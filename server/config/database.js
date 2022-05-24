const mongoose = require("mongoose");

const connectDataBase = async () => {
  try {
    const con = await mongoose.connect(process.env.MONGO_URL, {});

    console.log(`MongoDB Successfully Connected`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit();
  }
};

module.exports = connectDataBase;
