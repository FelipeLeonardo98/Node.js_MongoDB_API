const express = require('express');
const mongoose = require('mongoose');

// Incluindo a model do models/Artigo.js
require('./models/Artigo.js');
const Artigo = mongoose.model('artigo');


const app = express();
//permitir acesso ao formato JSON
app.use(express.json());

// Conexão com MongoDB
mongoose.connect('mongodb://localhost/tutorialcelke', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connection with MongoDB was sucess!");
}).catch((fail) => {
    console.log("A fail has been ocurred..." + fail);
});



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