const express = require('express');
const mongoose = require('mongoose');
const connection = require('./database/database');
const cors = require('cors');
const routes = require('./routes/routes');
// Incluindo a model do models/Artigo.js
require('./models/Artigo.js');
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





app.get("/", (req, res) => {
    Artigo.find({}).then((artigo) => {
        return res.json(artigo);
    }).catch((error) => {
        return res.status(400).json({
            error: true,
            message: "Nenhum artigo encontrado"
        });
    })
});

app.get("/artigo/:id", (req, res) => {
    Artigo.findOne({ _id: req.params.id }).then((artigo) => {
        return res.json(artigo);
    }).catch((error) => {
        return res.status(400).json({
            error: true,
            message: `Artigo com id ${req.params.id} não localizado`
        })
    })
})

app.post("/artigo", (req, res) => {
    const artigo = Artigo.create(req.body, (error) => {
        if (error) return res.status(400).json({
            error: true,
            message: "Erro: artigo não foi cadastrado. Erro: " + error
        })
        return res.status(200).json({
            error: false,
            message: "Artigo foi cadastrado com sucesso!"
        })
    })
});

app.put("/artigo/:id", (req, res) => {
    const artigo = Artigo.updateOne({ _id: req.params.id }, req.body, (error) => {
        if (error) return res.status(400).json({
            error: true,
            message: `Erro ao editar o Artigo: ${error}`
        });

        return res.json({
            error: false,
            message: `Artigo com id ${req.params.id} editado com sucesso`
        });
    });
});

app.listen(8080, () => {
    console.log("Server running at Port 8080");
})