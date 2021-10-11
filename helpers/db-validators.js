const Role = require('../models/role.models');
const Usuario = require('../models/usuario.models');


const esRolValido = async(rol='') =>{

   const existeRol = await Role.findOne({rol});
   if (!existeRol){
      throw new Error(`El rol ${ rol } no esta registrado en la BD`);
   }

};

const emailExiste = async(correo='') => {

   //Verificar si el correo existe
   const existeEmail = await Usuario.findOne({
      correo: correo
   });

   if (existeEmail){
      throw new Error(`El correo: ${correo}, ya esta registrado`);
   }

}

const usuarioExisteById = async(id='') => {

   //Verificar si el id ya existe
   const existeUsuario = await Usuario.findById(id);

   if (!existeUsuario){
      throw new Error(`El id: ${id}, no existe`);
   }

}


module.exports = {
   esRolValido,
   emailExiste,
   usuarioExisteById
}