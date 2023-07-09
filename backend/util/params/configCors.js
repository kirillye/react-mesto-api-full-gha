const configCors = {
  origin: [
    "http://mesto.kirill.nomoredomains.work",
    "htts://mesto.kirill.nomoredomains.work",
    "htts://api.mesto.kirill.nomoredomains.work",
    "htts://api.mesto.kirill.nomoredomains.work",
    "http://localhost:3000",
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

module.exports = configCors;
