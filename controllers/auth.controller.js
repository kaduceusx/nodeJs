const {response, request} = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario.models');
const {generarJWT} = require('../helpers/generar-jwt');


const login = async(req, res=response)=>{

   const {correo, contrasena} = req.body; //La respuesta 

   try {

      //Verifiar email existe
      const usuario = await Usuario.findOne({correo});
      if (!usuario){
         return res.status(400).json({
            msg: 'Usuario | Contraseña no son correctos - correo'
         })
      }

      //Usuario esta estado activo
      if (!usuario.estado){
         return res.status(400).json({
            msg: 'Usuario | Contraseña no son correctos - estado'
         })
      }

      //verificar contraseña
      const validarPassword = bcryptjs.compareSync(contrasena, usuario.contrasena);
      if (!validarPassword){
         return res.status(400).json({
            msg: 'Usuario | Contraseña no son correctos - password'
         })
      }

      //generar jsonwebtoken
      const token = await generarJWT(usuario.id);

      res.json({
         usuario,
         token
         // msg: 'Login correcto',
         // correo,
         // contrasena
      });
      
   } catch (error) {

      console.log(error);
      res.status(500).json({
         msg: 'Algo salio mal'
      });

   }

};

module.exports = {
   login
}