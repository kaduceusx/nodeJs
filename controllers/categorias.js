const { response } = require("express");
const {Categoria} = require('../models');

//Obtener categorias - pagina - total - populate
const obtenerCategorias = async(req, res=response)=>{

   const {limite=5, desde=0} = req.query;

   const query = {estado:true}

   const [total, categorias] = await Promise.all([
      Categoria.countDocuments(query),
      Categoria.find(query)
         .populate('usuario', 'nombre')
         .skip(Number(desde))
         .limit(Number(limite))
   ]);   

   res.json({
      total,
      categorias
   });  

}

//Obtener categoria - populate {}
const ObtenerCategoria = async(req, res=response)=>{

   const {id} = req.params;
   const categoria = await Categoria.findById(id).populate('usuario', 'nombre');

   res.json(categoria);

}


const crearCategoria = async(req, res=response)=>{

   const nombre = req.body.nombre.toUpperCase();

   const categoriaDb = await Categoria.findOne({nombre});

   if (categoriaDb) {
      return res.status(400).json({
         msg: `La categoria ${categoriaDb.nombre}, ya existe`
      });
   }

   //Gnerar la data a guardar
   const data = {
      nombre,
      usuario: req.usuario._id
   }

   const categoria = new Categoria(data);

   //guardar db
   await categoria.save();

   res.status(201).json(categoria)

}

//Actualizar categoria
const actualizarCategoria = async(req, res=response)=>{

   const {id} = req.params;
   const {estado, usuario, ...resto} = req.body;

   resto.nombre  = resto.nombre.toUpperCase();
   resto.usuario = req.usuario._id;

   const categoria = await Categoria.findByIdAndUpdate(id, resto, {new:true});

   res.json(categoria);

}

//Borrar categoria
const borrarCategoria = async(req, res=response)=>{

   const {id} = req.params;
   const categoriaBorrada = await Categoria.findByIdAndUpdate(id, {estado:false}, {new: true});

   res.status(200).json({
      categoriaBorrada
   })

}

module.exports = {
   obtenerCategorias,
   ObtenerCategoria,
   crearCategoria,
   actualizarCategoria,
   borrarCategoria
}