const Sequelize = require('sequelize');


//NOTE: here 'react-starter is the name of your database!!!!
// create a db with postgres and change react-starter to that!
//process.env.DATABASE_URL is for hosting db's in heroku
const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost:5432/react-starter', {
  logging: false // unless you like the logs
  // other options???
});

//require in all your models

module.exports = db;