const mongoose = require('mongoose');

// Incluindo a model do models/Artigo.js
require('../models/Artigo');
const Artigo = mongoose.model('artigo');


exports.Select = (req, res) => {
    Artigo.find({}).then((artigo) => {
        return res.json(artigo);
    }).catch((error) => {
        return res.status(400).json({
            error: true,
            message: "Nenhum artigo encontrado"
        });
    })
};

exports.Delete = (req, res) => {
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