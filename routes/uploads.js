
const {Router} = require('express');
const {check} = require('express-validator');
const { validarCampos, validarArchivoSubir } = require('../middlewares');

const {cargarArchivo, actualizarArchivo, mostrarImagen} = require('../controllers/uploads');
const { coleccionesPermitidas } = require('../helpers');

const router = Router();


router.post('/', validarArchivoSubir, cargarArchivo)

router.put('/:coleccion/:id', [
   validarArchivoSubir,
   check('id', 'EL id debe ser de mongodb').isMongoId(),
   check('coleccion').custom(c=>coleccionesPermitidas(c, ['usuarios','productos'])),
   validarCampos
], actualizarArchivo)

router.get('/:coleccion/:id', [
   check('id', 'EL id debe ser de mongodb').isMongoId(),
   check('coleccion').custom(c=>coleccionesPermitidas(c, ['usuarios','productos'])),
   validarCampos
], mostrarImagen);


module.exports = router;
