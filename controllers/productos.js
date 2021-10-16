const { response } = require("express");
const {Producto} = require('../models');

//Obtener productos - pagina - total - populate
const obtenerProductos = async(req, res=response)=>{

   const {limite=5, desde=0} = req.query;

   const query = {estado:true}

   const [total, productos] = await Promise.all([
      Producto.countDocuments(query),
      Producto.find(query)
         .populate('usuario', 'nombre')
         .skip(Number(desde))
         .limit(Number(limite))
   ]);   

   res.json({
      total,
      productos
   });  

}

//Obtener producto - populate {}
const ObtenerProducto = async(req, res=response)=>{

   const {id} = req.params;
   const producto = await Producto.findById(id)
                           .populate('usuario', 'nombre')
                           .populate('categoria', 'nombre');

   res.json(producto);

}


const crearProducto = async(req, res=response)=>{

   const {estado, usuario, ...body} = req.body;

   const productoDb = await Producto.findOne({nombre: body.nombre});

   if (productoDb) {
      return res.status(400).json({
         msg: `La producto ${productoDb.nombre}, ya existe`
      });
   }

   //Gnerar la data a guardar
   const data = {
      ...body,
      nombre: body.nombre.toUpperCase(),
      usuario: req.usuario._id
   }

   const producto = new Producto(data);

   //guardar db
   await producto.save();

   res.status(201).json(producto)

}

//Actualizar producto
const actualizarProducto = async(req, res=response)=>{

   const {id} = req.params;
   const {estado, usuario, ...resto} = req.body;

   if (resto.nombre) {
      resto.nombre  = resto.nombre.toUpperCase();
   }
   resto.usuario = req.usuario._id;

   const producto = await Producto.findByIdAndUpdate(id, resto, {new:true});

   res.json(producto);

}

//Borrar producto
const borrarProducto = async(req, res=response)=>{

   const {id} = req.params;
   const ProductoBorrada = await Producto.findByIdAndUpdate(id, {estado:false}, {new: true});

   res.status(200).json({
      ProductoBorrada
   })

}

module.exports = {
   obtenerProductos,
   ObtenerProducto,
   crearProducto,
   actualizarProducto,
   borrarProducto
}