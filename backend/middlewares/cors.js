const allowedCors = [
  "https://mesto.kirill.nomoredomains.work",
  "http://mesto.kirill.nomoredomains.work",
  "https://api.mesto.kirill.nomoredomains.work",
  "http://api.mesto.kirill.nomoredomains.work",
  "https://localhost:3000",
  "http://localhost:3000",
];

module.exports = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers["access-control-request-headers"];
  const DEFAULT_ALLOWED_METHODS = "GET,HEAD,PUT,PATCH,POST,DELETE";

  res.header("Access-Control-Allow-Credentials", true);

  if (allowedCors.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }

  if (method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", DEFAULT_ALLOWED_METHODS);
    res.header("Access-Control-Allow-Headers", requestHeaders);

    return res.end();
  }

  return next();
};
