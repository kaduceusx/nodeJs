
const dbValidators = require('./db-validators');
const generarJwt = require('./generar-jwt');
const subirArchivo = require('./subir-archivo');


module.exports = {
   ...dbValidators,
   ...generarJwt,
   ...subirArchivo
}