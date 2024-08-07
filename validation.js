const { body } = require("express-validator");

const validation = [
  body("name", "Введите имя").isString().isLength({ min: 2 }),
  body("number", "Неправильный формат номера телефона")
    .isString()
    .isLength({ min: 10 }),
  body("service", "Введите услугу").isString().isLength({ min: 5 }),
  body("city", "Введите город").isString().isLength({ min: 2 }),
];

module.exports = validation;
