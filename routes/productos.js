const {Router} = require('express');
const {check} = require('express-validator');

const {validarJWT, validarCampos, esAdminRole} = require('../middlewares');

const {obtenerProductos, ObtenerProducto, crearProducto, actualizarProducto, borrarProducto} = require('../controllers/productos');
const {existeCategoriaPorId, existeProductoPorId} = require('../helpers/db-validators');



const router = Router();

/* -------------------------------------------------------------------------- */
/*                              OBTENER PRODUCTOS                             */
/* -------------------------------------------------------------------------- */
router.get('/',  obtenerProductos);

/* -------------------------------------------------------------------------- */
/*                             OBTENER 1 PRODUCTO                             */
/* -------------------------------------------------------------------------- */
router.get('/:id', [
   check('id', 'No es un id de mongo valido').isMongoId(),
   check('id').custom(existeProductoPorId),
   validarCampos,
], ObtenerProducto);

/* -------------------------------------------------------------------------- */
/*                               CREAR PRODUCTO                               */
/* -------------------------------------------------------------------------- */
router.post('/', [
   validarJWT,
   check('nombre', 'El nombre es obligatorio').not().isEmpty(),
   check('categoria', 'No es un id de mongo').isMongoId(),
   check('categoria').custom(existeCategoriaPorId),
   validarCampos
], crearProducto);

/* -------------------------------------------------------------------------- */
/*                             ACTUALIZAR PRODUCTO                            */
/* -------------------------------------------------------------------------- */
router.put('/:id', [
   validarJWT,
   check('categoria', 'No es un id de mongo').isMongoId(),
   check('id').custom(existeProductoPorId),
   validarCampos
], actualizarProducto);

/* -------------------------------------------------------------------------- */
/*                               BORRAR PRODUCTO                              */
/* -------------------------------------------------------------------------- */
router.delete('/:id', [
   validarJWT,
   esAdminRole,
   check('id', 'No es un id de mongo valido').isMongoId(),
   check('id').custom(existeProductoPorId),
   validarCampos
], borrarProducto);

module.exports = router;