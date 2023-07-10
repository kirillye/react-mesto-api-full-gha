const router = require("express").Router();
const userRoutes = require("./users");
const cardRoutes = require("./cards");
const NotFound = require("../errors/not-found-error");

// главная страница
router.get("/", function (req, res) {
  res.send("hello world");
});

router.get("/crash-test", function (req, res) {
  setTimeout(() => {
    throw new Error("Сервер сейчас упадёт");
  }, 0);
});
router.use("", userRoutes);
router.use("/cards", cardRoutes);

router.all("*", (req, res, next) => {
  next(new NotFound(`Ресурс по адресу ${req.path} не найден`));
});

module.exports = router;
