// Массив доменов, с которых разрешены кросс-доменные запросы
const allowedCors = [
  "htts://mesto.kirill.nomoredomains.work/",
  "http://mesto.kirill.nomoredomains.work/",
  "http://api.mesto.kirill.nomoredomains.work/",
  "https://api.mesto.kirill.nomoredomains.work/",
  "localhost:3000",
];

module.exports = allowedCors;