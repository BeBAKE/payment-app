const express = require("express");
const app = express();

require("dotenv").config();
const connectdb = require("./db.js");
const rootRouter = require("./routes/index.js");
const cors = require("cors");

const port = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use("/api/v1", rootRouter);

const start = async () => {
  try {
    connectdb(process.env.MONGO_URI);
    app.listen(port);
    console.log(`Server is running`);
  } catch (error) {
    console.log("Server has internal problem");
  }
};

start();
