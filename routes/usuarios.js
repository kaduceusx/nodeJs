const {Router} = require('express');
const {check} = require('express-validator');
const {validarCampos} = require('../middlewares/validar-campos');
const {esRolValido, emailExiste, usuarioExisteById} = require('../helpers/db-validators');
const { usuariosGet, usuariosPosts, usuariosPut, usuariosPatch, usuariosDelete } = require('../controllers/usuarios');

const router = Router();

router.get('/', usuariosGet);

router.post('/', [
   //midlewares
   check('nombre', 'El nombre es obligatorio').not().isEmpty(),
   check('contrasena', 'La contraseña es obligatoria y de mas de 6 letras').isLength({min:6}),
   check('correo', 'El correo no es valido').isEmail(),
   check('correo').custom(emailExiste),
   // check('rol', 'No es un rol valido').isIn(['ADMIN-ROL','USER-ROL']),
   check('rol').custom( esRolValido),
   validarCampos
], usuariosPosts);

router.put('/:id', [
   //Middlewares
   check('id', 'No es un id valido').isMongoId(),
   check('id').custom(usuarioExisteById),
   check('rol').custom( esRolValido),
   validarCampos
],usuariosPut);

router.patch('/', usuariosPatch);   

router.delete('/:id', [
   //Middlewares
   check('id', 'No es un id valido').isMongoId(),
   check('id').custom(usuarioExisteById),
   validarCampos
], usuariosDelete);


module.exports = router;