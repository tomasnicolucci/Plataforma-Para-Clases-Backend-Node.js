const express = require('express');
const router = express.Router();
const controller = require('./../controllers/profesores');
const data = require('./../data/profesores');
const auth = require('./../middlewares/Auth');

router.get('/', async function(req, res, next) {
  res.json(await controller.getProfesores());
});

router.post('/', async (req,res) => {
  res.json(await controller.addProfesor(req.body));
});

router.get('/:id', async function(req, res, next) {
  res.json(await controller.getProfesorById(req.params.id));
});

router.post('/login', async (req,res) => {
  try {
    const prof = await data.findByCredential(req.body.mail, req.body.password);
    const token = data.generatedToken(prof);
    res.send({prof, token});
  } catch (error){
      res.status(401).send(error.message);
  }
});

router.post('/altaClase/:id', async (req,res) => {
    res.json(await controller.altaClase(req.body, req.params));
});

module.exports = router;