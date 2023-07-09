const { PORT = 4000, MONGO_URL = "mongodb://localhost:27017" } = process.env;
const express = require("express");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const errorHandler = require("./middlewares/errorHandler");
const logErrors = require("./middlewares/logErrors");
const { errors } = require("celebrate");
const app = express();
const cors = require("cors");

app.use(cookieParser());
app.use(express.static("public"));
// parse application/json
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

const routes = require("./routes");
const mongoose = require("mongoose");

mongoose
  .connect(`${MONGO_URL}/database`, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log("error conected to db");
  });

app.use(routes);
app.use(errors());
app.use(logErrors);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
