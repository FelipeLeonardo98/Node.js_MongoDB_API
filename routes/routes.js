const express = require('express');
const ArtigoController = require('../controllers/artigoController');
const router = express.Router();

router.get('/select', ArtigoController.Select);
router.delete('/delete/:id', ArtigoController.Delete);
module.exports = router;