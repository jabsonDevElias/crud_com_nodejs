const sequelize  = require("sequelize");
const conectar = new sequelize('crud','root','',{
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = conectar;