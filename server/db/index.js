const db = require('./sequelizeDb');
const User = require('./models/users');
//require in all our models
require('./models');

// Syncing all the models at once. This promise is used by main.js.
let syncedDbPromise = db.sync({force:true});

syncedDbPromise
  .then(() => {
  console.log('Sequelize models synced to PostgreSQL');
    User.create({
      first_name: "Ryan",
      last_name: "Skinner"
    })
      .then((user) => {
        console.log(`also created user ${user.first_name}`)
      })
})

module.exports = syncedDbPromise;