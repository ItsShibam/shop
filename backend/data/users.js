const bcrypt = require("bcryptjs");

const users = [
  {
    name: "admin",
    email: "admin@gmail.com",
    password: bcrypt.hashSync("12345", 10),
    isAdmin: true,
  },
  {
    name: "Alok Patra",
    email: "alok@gmail.com",
    password: bcrypt.hashSync("12345", 10),
    isAdmin: false,
  },
  {
    name: "Shibam Patra",
    email: "shibam@gmail.com",
    password: bcrypt.hashSync("12345", 10),
    isAdmin: false,
  },
];

module.exports = users;
