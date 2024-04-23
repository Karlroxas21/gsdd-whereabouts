require("dotenv").config();

const express = require("express");
const Sequelize = require("sequelize");
const db_config = require("./config").database;
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 80;

app.use(bodyParser.json());

const sequelize = new Sequelize(db_config.database, db_config.user, db_config.password, {
    host: db_config.server,
    dialect: 'mssql'
});

sequelize.authenticate().then(() =>{
    console.log('Connection has been established successfully');
}).catch(err =>{
    console.error('Unable to connect to the db: ' + err);
})

module.exports = sequelize;

const User = require('./model/account.model');

app.get('/test', (req, res) =>{
    User.findAll().then(users =>{
        res.json(users)
    })
})

//Routes
const account_routes = require('./routes/account.routes');
app.use('/', account_routes);

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});

