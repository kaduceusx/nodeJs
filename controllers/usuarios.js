const {response} = require('express');


const usuariosGet = (req,res=response) => {

   const query = req.query;
   res.json({
      msg: 'es ina peticion get controllador',
      query
   });   
}

const usuariosPosts = (req,res=response) => {

   const {nombre, edad} = req.body;
   res.json({
      msg: 'es ima peticion posts controller',
      nombre,
      edad
      
   });
}

const usuariosPut = (req,res=response) => {
   
   const id = req.params.id;
   res.json({
      msg: 'es ima peticion put controller',
      id
   });
}

const usuariosPatch = (req,res=response) => {
   res.json({
      msg: 'es ima peticion patch controller'
   });
}

const usuariosDelete = (req,res=response) => {
   res.json({
      msg: 'es ima peticion delete controller'
   });
}

module.exports = {
   usuariosGet,
   usuariosPosts,
   usuariosPut,
   usuariosPatch,
   usuariosDelete
}