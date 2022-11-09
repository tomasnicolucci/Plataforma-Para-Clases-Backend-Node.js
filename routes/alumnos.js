const express = require('express');
const router = express.Router();
const controller = require('../controllers/alumnos');
const data = require('./../data/alumnos');
const auth = require('./../middlewares/Auth');

router.get('/', async(req, res) => {
  res.json(await controller.getAllAlumnos());
})

router.get('/:id', async(req, res) => {
  res.json(await controller.getAlumnoPorId(req.params.id));
})

router.post('/', async (req, res)=>{
  const result = await controller.agregarAlumno(req.body);
  res.json(result);
});

router.delete('/:id', async(req, res) => {
  res.json(await controller.eliminarAlumno(req.params.id));
})

router.put('/:id', async(req, res) => {
  res.json(await controller.modificarAlumno(req.params.id,req.body))
})

router.post('/login', async (req,res) => {
  try {
    const alu = await data.findByCredential(req.body.mail, req.body.password);
    const token = data.generatedToken(alu);
    res.send({alu, token});
  } catch (error){
      res.status(401).send(error.message);
  }
});

router.post('/anotarseClase/:idAlumno', async (req, res) => {
  res.json(await controller.anotarseAClase(req.body.clase_id, req.params.idAlumno));
});

router.post('/cancelarClase/:idAlumno', async (req, res) => {
  res.json(await controller.cancelarClase(req.body.clase_id, req.params.idAlumno));
});

module.exports = router;