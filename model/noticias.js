const sequelize = require('sequelize');
const conecta = require("./conectar");

const noticias = conecta.define('noticias',{
  noti_tx_titulo:{
      type: sequelize.STRING,
      allowNull:false
  },noti_tx_describreve:{
      type: sequelize.STRING,
      allowNull:false
  },noti_tx_descricao:{
    type: sequelize.TEXT,
    allowNull:false
  },noti_tx_status:{
    type: sequelize.STRING,
    allowNull:false
  }
});

// noticias.sync({force:true});

module.exports = noticias;