const express = require('express');
const router = express.Router();
const controller = require('../controllers/clases');

router.get('/', async (req, res) => {
    res.json(await controller.getClases());
});

router.get('/:id', async(req, res) => {
    res.json(await controller.getClasePorId(req.params));
});

router.post('/', async (req, res) => {
    res.json (await controller.addClase(req.body));
});

module.exports = router;