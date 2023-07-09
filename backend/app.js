require("dotenv").config();

const { PORT = 3000, MONGO_URL = "mongodb://localhost:27017" } = process.env;

const express = require("express");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middlewares/errorHandler");
const logErrors = require("./middlewares/logErrors");
const { errors } = require("celebrate");
const app = express();
const cors = require("./middlewares/cors");

app.use(cookieParser());
// app.use(express.static("public"));
// parse application/json
app.use(express.json());

const routes = require("./routes");
const mongoose = require("mongoose");

mongoose
  .connect(`mongodb://127.0.0.1:27017/database`, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log("error conected to db");
  });

app.use(cors);
app.use(routes);
app.use(errors());
app.use(logErrors);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
