'use strict';

const Sequelize = require('sequelize');
const db = require('../sequelizeDb');

const User = db.define('user', {
  first_name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  last_name: {
    type: Sequelize.STRING,
    allowNull: false
  }
}
// NOTE!! please don't forget that these exist!!!!
//,{
//   hooks: {
//     ALSO NOTE!! the name of the define HAS to be a parameter on the lifecycle hooks on db models
//     beforeValidate: function(user){
//
//         }
//   },
// classMethods: {
//
// },
// instanceMethods: {
//
//  }
// }
);

module.exports = User;