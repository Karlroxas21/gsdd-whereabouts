require("dotenv").config();

module.exports = {
  database: {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB,
    server: 'localhost',
    options: {
      trustServerCertificate: true,
    },
  },
};
