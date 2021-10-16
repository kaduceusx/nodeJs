const { response } = require("express");
const {ObjectId} = require('mongoose').Types;
const {Usuario, Categoria, Producto} = require('../models/');

const coleccionesPermitidas = [
   'usuarios',
   'categorias',
   'productos',
   'roles'
];

/* -------------------------------------------------------------------------- */
/*                               BUSCAR USUARIO                               */
/* -------------------------------------------------------------------------- */
const buscarUsuario = async(termino='', res=response)=>{

   const esMongoId = ObjectId.isValid(termino); //TRUE

   if(esMongoId){
      const usuario = await Usuario.findById(termino);
      return res.json({
         resultados: (usuario) ? [usuario] : []
      })
   }

   //Quita el problema de mayusculas y minisculas en la busqueda. 
   //Tambien ayuda a que la busqueda no sea necesario poner el termino exacto.
   //NUNCA ANTES UNA FUNCION TAN SENCILLA TE DABA TANTO.
   const expresionRegular = new RegExp(termino, 'i'); 

   const usuarios = await Usuario.find({
      $or: [
         {nombre: expresionRegular},
         {correo: expresionRegular}
      ],
      $and: [
         {estado: true}
      ]
   });

   const numeroResultados = await Usuario.count({
      $or: [
         {nombre: expresionRegular},
         {correo: expresionRegular}
      ],
      $and: [
         {estado: true}
      ]
   });

   return res.json({
      resultados: usuarios, numeroResultados
   })
}

/* -------------------------------------------------------------------------- */
/*                              BUSCAR CATEGORIA                              */
/* -------------------------------------------------------------------------- */
const buscarCategoria = async(termino='', res=response)=>{

   const esMongoId = ObjectId.isValid(termino); //TRUE

   if(esMongoId){
      const categoria = await Categoria.findById(termino);
      return res.json({
         resultados: (categoria) ? [categoria] : []
      })
   }

   //Quita el problema de mayusculas y minisculas en la busqueda. 
   //Tambien ayuda a que la busqueda no sea necesario poner el termino exacto.
   //NUNCA ANTES UNA FUNCION TAN SENCILLA TE DABA TANTO.
   const expresionRegular = new RegExp(termino, 'i'); 

   const categorias = await Categoria.find({nombre: expresionRegular, estado: true});

  

   res.json({
      resultados: categorias  
   })
}


/* -------------------------------------------------------------------------- */
/*                               BUSCAR PRODUCTO                              */
/* -------------------------------------------------------------------------- */
const buscarProducto = async(termino='', res=response)=>{

   const esMongoId = ObjectId.isValid(termino); //TRUE

   if(esMongoId){
      const producto = await Producto.findById(termino).populate('categoria', 'nombre');
      return res.json({
         resultados: (producto) ? [producto] : []
      })
   }

   const expresionRegular = new RegExp(termino, 'i'); 
   const productos = await Producto.find({nombre: expresionRegular, estado: true}).populate('categoria', 'nombre');


   res.json({
      resultados: productos  
   })
}

/* -------------------------------------------------------------------------- */
/*                                 BUSCAR MAIN                                */
/* -------------------------------------------------------------------------- */
const buscar = (req, res=response)=>{

   const {coleccion, terminoBusqueda} = req.params;

   if (!coleccionesPermitidas.includes(coleccion)) {
      res.status(400).json({
         msg: 'Las coleccion permitidas son: ' + coleccionesPermitidas
      })
   }

   switch (coleccion) {
      case 'usuarios': 
         buscarUsuario(terminoBusqueda, res);
         break;
      case 'categorias': 
         buscarCategoria(terminoBusqueda, res);
         break;
      case 'productos':
         buscarProducto(terminoBusqueda, res);
         break;
   
      default:
         res.status(500).json({
            msg: 'Se me olvido hacer esta busqueda.'
         })
         break;
   }

}

module.exports = {
   buscar
}