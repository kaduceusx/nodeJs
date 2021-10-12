const {response, request} = require('express');
const bycrypt = require('bcryptjs');
const Usuario = require('../models/usuario.models');

const usuariosGet = async(req = request,res=response) => {

   const {limite=5, desde=0} = req.query;

   const query = {estado:true}

   const [total, usuarios] = await Promise.all([
      Usuario.countDocuments(query),
      Usuario.find(query)
      .skip(Number(desde))
      .limit(Number(limite))
   ]);   

   res.json({
      total,
      usuarios
   });   
}

const usuariosPosts = async(req,res=response) => {

   const {nombre, correo, contrasena, rol} = req.body;
   const usuario = new Usuario({
      nombre,
      correo,
      contrasena,
      rol
   });

   //Encriptar contraseña
   const salt = bycrypt.genSaltSync();
   usuario.contrasena = bycrypt.hashSync(contrasena, salt);

   //Guardar
   await usuario.save();

   res.json({
      msg: 'es ima peticion posts controller',
      usuario
      
   });
}

const usuariosPut = async(req,res=response) => {
   
   const id = req.params.id;
   const {_id, contrasena, estado, correo, ...resto} = req.body;

   //Todo validar contra BD
   if(contrasena){
      //Encriptar contraseña
      const salt = bycrypt.genSaltSync();
      resto.contrasena = bycrypt.hashSync(contrasena, salt);
   }

   const usuarioDB = await Usuario.findByIdAndUpdate(id, resto);

   res.json(usuarioDB);
}

const usuariosPatch = (req,res=response) => {
   res.json({
      msg: 'es ima peticion patch controller'
   });
}

const usuariosDelete = async(req,res=response) => {

   const {id} = req.params;

   //const uid = req.uid;

   //fisicamente
   //const usuario = await Usuario.findByIdAndDelete(id);

   //cambiar el estado activado del usuario
   const usuario = await Usuario.findByIdAndUpdate(id, {estado:false});

   return res.json(usuario);
}

module.exports = {
   usuariosGet,
   usuariosPosts,
   usuariosPut,
   usuariosPatch,
   usuariosDelete
}