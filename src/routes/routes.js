const express = require('express');
const ArtigoController = require('../controllers/artigoController');
const router = express.Router();

router.get('/', ArtigoController.Listar);
router.get('/pesquisar/:id', ArtigoController.Pesquisar);
router.post('/cadastrar', ArtigoController.Cadastrar);
router.put('/editar/:id', ArtigoController.Editar);
router.delete('/excluir/:id', ArtigoController.Excluir);
module.exports = router;