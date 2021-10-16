const {Router} = require('express');
const {check} = require('express-validator');

const {validarJWT, validarCampos, esAdminRole} = require('../middlewares');

const {obtenerCategorias, ObtenerCategoria, crearCategoria, actualizarCategoria, borrarCategoria} = require('../controllers/categorias');
const {existeCategoriaPorId} = require('../helpers/db-validators');


const router = Router();

//Obtener todas categorias - publico
router.get('/',  obtenerCategorias);

//Obtener 1 categoria con el id - public
router.get('/:id', [
   check('id', 'No es un id de mongo valido').isMongoId(),
   check('id').custom(existeCategoriaPorId),
   validarCampos,
], ObtenerCategoria);

// crear categoria - privado- cualquier persona con un token valido
router.post('/', [
   validarJWT,
   check('nombre', 'El nombre es obligatorio').not().isEmpty(),
   validarCampos
], crearCategoria);

//actualziar - privado- cualquiera con token valido
router.put('/:id', [
   validarJWT,
   check('nombre', 'El nombre es obligatorio').not().isEmpty(),
   check('id').custom(existeCategoriaPorId),
   validarCampos
], actualizarCategoria);

//Borrar una categoria - solo Admin
router.delete('/:id', [
   validarJWT,
   esAdminRole,
   check('id', 'No es un id de mongo valido').isMongoId(),
   check('id').custom(existeCategoriaPorId),
   validarCampos
], borrarCategoria);

module.exports = router;