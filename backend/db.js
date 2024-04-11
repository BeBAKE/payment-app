const mongoose = require("mongoose");

const connectdb = async (uri) => {
  return mongoose.connect(uri);
};

module.exports = connectdb;
