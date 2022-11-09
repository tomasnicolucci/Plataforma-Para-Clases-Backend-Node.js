const express = require('express');
const router = express.Router();
const controller = require('../controllers/deportes');

//DEPORTES

router.get('/', async(req, res) => {
    res.json(await controller.getDeportes());
})

router.get('/:nombre', async(req,res) =>{
    res.json(await controller.getDeportesPorNombre(req.params.nombre))
});

router.post('/', async (req, res)=>{
    const result = await controller.insertDeporte(req.body);
    res.json(result);
});

router.delete('/:nombre', async(req,res) => {
    res.json(await controller.deleteDeporte(req.params.nombre))
})

module.exports = router;