const mongoose = require('mongoose');

// Incluindo a model do models/Artigo.js
require('../models/Artigo');
const Artigo = mongoose.model('artigo');


exports.Listar = (req, res) => {
    Artigo.find({}).then((artigo) => {
        return res.json(artigo);
    }).catch((error) => {
        return res.status(400).json({
            error: true,
            message: "Nenhum artigo encontrado"
        });
    })
};


exports.Pesquisar = (req, res) => {
    Artigo.findOne({ _id: req.params.id }).then((artigo) => {
        return res.json(artigo);
    }).catch((error) => {
        return res.status(400).json({
            error: true,
            message: `Artigo com id ${req.params.id} não localizado`
        })
    })
}

exports.Cadastrar = (req, res) => {
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
}

exports.Editar = (req, res) => {
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
}

exports.Excluir = (req, res) => {
    const artigo = Artigo.deleteOne({ _id: req.params.id }, (error) => {
        if (error) return res.status(400).json({
            error: true,
            message: `Erro ao deletar artigo! ${error}`
        });
        return res.json({
            error: false,
            message: "Artigo deletado com sucesso!"
        });
    });
}