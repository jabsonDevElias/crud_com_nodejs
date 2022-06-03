const express = require('express');
const app = express();
const sequelize = require('sequelize');
const bodyparser = require('body-parser');
const rotas = express.Router();
//base de dados
const conecta = require("./model/conectar");
const noticias = require('./model/noticias');
// const { type } = require('express/lib/response');
// const { where } = require('sequelize');

app.set('view engine','ejs'); //motor de html (Arquivos que vamos usar no front);

app.use(express.static('public'));

app.use(
  bodyparser.urlencoded({
  extended: true,
  })
  )
  

app.use(bodyparser.json())

app.listen(3000,()=>{
    console.log('servidor rodando!');
})

app.get('/',(req,res)=>{

noticias.findAll({where:{noti_tx_status:'ativo'}}).then(noticias =>{
  res.render('index',{noticias});
});

});

app.get('/cadastrar',(req,res)=>{
  if(req.query.id){
    noticias.findAll({where:{id:req.query.id}}).then(noticias =>{
      res.render('cadastrar',{noticias});
    });   
  }else{

      res.render("cadastrar",{noticias});
  }
});

app.post('/cadastrar_noticia',(req,res)=>{
  var titulo = req.body.titulo;
  let descricao = req.body.descricao;
  let desc_breve = descricao.substr(0,15);
  
  if(req.body.id){
    noticias.update({noti_tx_titulo:titulo,noti_tx_describreve:desc_breve,noti_tx_descricao:descricao,noti_tx_status:'ativo'},{where:{id:req.body.id}});
  }else{
    noticias.create({noti_tx_titulo:titulo,noti_tx_describreve:desc_breve,noti_tx_descricao:descricao,noti_tx_status:'ativo'});
  }
  res.redirect('/');
});

app.post('/excluir',(req,res)=>{
  noticias.update({noti_tx_status:'inativo'},{where:{id:req.body.id}}).then((noticia)=>{
    res.redirect('/');
  })

});


