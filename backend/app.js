require("dotenv").config();
const { PORT = 3000, MONGO_URL = "mongodb://localhost:27017" } = process.env;
const express = require("express");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middlewares/errorHandler");
const logErrors = require("./middlewares/logErrors");
const { errors } = require("celebrate");
const { reqLogger, errLogger } = require("./middlewares/log");
const app = express();
const routes = require("./routes");
const mongoose = require("mongoose");
// const cors = require("./middlewares/cors");
const cors = require("cors");

app.use(cookieParser());
app.use(express.json());
// app.use(cors);
app.use(cors());

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

app.use(routes);
app.use(errors());
app.use(logErrors);
app.use(reqLogger);
app.use(errLogger);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
