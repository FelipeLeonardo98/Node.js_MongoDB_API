const express = require('express');
const mongoose = require('mongoose');
const connection = require('./src/database/database');
const cors = require('cors');
const routes = require('./src/routes/routes');
// Incluindo a model do models/Artigo.js
require('./src/models/Artigo.js');
const Artigo = mongoose.model('artigo');


const app = express();
//permitir acesso ao formato JSON
app.use(express.json());

//O CORS será um Middleware: Liberará o serviço do nosso software-API para terceiros ( um "filtro", "barragem")
app.use((req, res, next) => {
    //Para testar o Middleware: console.log("Acessou o Middleware!");
    //Access-Control-Allow-Origin para permitir acesso a sua API por terceiros
    res.header("Access-Control-Allow-Origin", "*");
    //res.header("Access-Control-Allow-Origin", "site/url");
    //Configurar quais métodos serão permitidos
    res.header("Access-Control-Allow-Methods", 'GET', 'PUT', 'POST', 'DELETE');
    app.use(cors());
    next();
});

app.use('/api', routes);



app.listen(8080, () => {
    console.log("Server running at Port 8080");
})