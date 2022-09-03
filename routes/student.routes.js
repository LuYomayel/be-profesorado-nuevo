const { Router } = require('express');

const studentFunctions = require('../controllers/student.controllers');

const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { existStudent } = require('../helpers/db-validators');
const { validateStudent } = require('../middlewares/validate-existencia');

const router = Router();

// Devuelve todos los alumnos
router.get('/', (req, res)=>{
    studentFunctions.getAllStudents()
        .then( response => {
            res.status(200).send(response)
        })
        .catch(err=>{
            res.status(500).send(err)
        })
});

// Devuelve un alumno por id
router.get('/:id', (req, res)=>{
    studentFunctions.getStudent(req.params)
        .then( response => {
            res.status(200).send(response)
        })
        .catch(err=>{
            res.status(500).send(err)
        })
});

// Agrega un alumno
router.post('/', (req, res)=>{
    studentFunctions.addStudent()
        .then( response => {
            res.status(200).send(response)
        })
        .catch(err=>{
            res.status(500).send(err)
        })
});

// Agrega un alumno
router.put('/:id',[
    validateStudent,
    // check('id').custom(existStudent),
    validarCampos
], (req, res)=>{
    studentFunctions.putStudent(req.params, req.body,req)
        .then( response => {
            res.status(200).send(response)
        })
        .catch(err=>{
            res.status(500).send(err)
        })
});



module.exports = router;