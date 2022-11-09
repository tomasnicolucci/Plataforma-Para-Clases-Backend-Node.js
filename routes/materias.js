const express = require('express');
const router = express.Router();
const controller = require('../controllers/materias');

router.get('/', async(req, res) => {
    res.json(await controller.getMaterias());
})

router.post('/', async (req, res)=>{
    const result = await controller.insertMateria(req.body);
    res.json(result);
});

router.delete('/:nombre', async(req,res) => {
    res.json(await controller.deleteMateria(req.params.nombre))
})

module.exports = router;