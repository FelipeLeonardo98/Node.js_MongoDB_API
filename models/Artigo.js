const mongoose = require('mongoose');

// Criando uma model (Collection)
const Artigo = mongoose.Schema({
    titulo:
    {
        type: String,
        required: true
        // not null
    },
    conteudo:
    {
        type: String,
        required: true
        //not null
    }
},
    {
        timestamps: true,
        // default (incluir automaticamente)
    });

// exportando model
mongoose.model('artigo', Artigo);