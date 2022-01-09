const path = require("path");
const fs = require("fs");
const { response } = require("express");
const { subirArchivo } = require("../helpers");

const {Usuario, Producto} = require("../models");

const cargarArchivo = async (req, res=response)=>{

   //console.log(req.files);
   
   try {
      // const pathComplemto = await subirArchivo(req.files, ['txt','md'], 'textos');
      const pathComplemto = await subirArchivo(req.files, undefined, 'imgs'); //al ser undefined manda el argumento por defecto
   
      res.json({
         NombreDelArchivo: pathComplemto
      })
   } catch (error) {
      res.status(400).json({
         msg: error
      });
   }

   //Imagenes

   

}


const actualizarArchivo = async (req, res=response)=>{

   try {
      const {id, coleccion} = req.params;

      let modelo;

      switch (coleccion) {
         case 'usuarios':
            modelo = await Usuario.findById(id);
            if(!modelo){
               return res.status(400).json({
                  msg: `No existe un usuario con el id ${id}`
               })
            }
            break;

         case 'productos':
            modelo = await Producto.findById(id);
            if(!modelo){
               return res.status(400).json({
                  msg: `No existe un producto con el id ${id}`
               })
            }
            break;
      
         default:
            return res.status(500).json({
               msg: 'Se me olvido validar esto'
            });
      }


      //Limpiar imagenes previas
      if(modelo.img){

        
         //hay que borrar la img del servidor
         const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img);

        
         if(fs.existsSync(pathImagen)){
            fs.unlinkSync(pathImagen);
         }


      }

      const nombreArchivo = await subirArchivo(req.files, undefined, coleccion);
      modelo.img = nombreArchivo;
      
      await modelo.save();

      res.json({
         modelo
      });

   } catch (error) {
      res.json({
         msg: "el error es : " + error
      })
   }

   

}


const mostrarImagen = async(req, res=response) => {

   try {
      const {id, coleccion} = req.params;

      let modelo;

      switch (coleccion) {
         case 'usuarios':
            modelo = await Usuario.findById(id);
            if(!modelo){
               return res.status(400).json({
                  msg: `No existe un usuario con el id ${id}`
               })
            }
            break;

         case 'productos':
            modelo = await Producto.findById(id);
            if(!modelo){
               return res.status(400).json({
                  msg: `No existe un producto con el id ${id}`
               })
            }
            break;
      
         default:
            return res.status(500).json({
               msg: 'Se me olvido validar esto'
            });
      }


      //Limpiar imagenes previas
      if(modelo.img){

         //hay que borrar la img del servidor
         const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img);

         if(fs.existsSync(pathImagen)){
            return res.sendFile(pathImagen);
         }
      }

      const pathImagenDefecto = path.join(__dirname, '../assets/imgs', coleccion, 'no-image.jpg');

      // return res.json({
      //    msg: pathImagenDefecto
      // })
      return res.sendFile(pathImagenDefecto);

      res.json({
         msg: 'Falta placeholder'
      })

   } catch (error) {
      res.json({
         msg: "el error es : " + error
      })
   }
}

module.exports = {
   cargarArchivo,
   actualizarArchivo,
   mostrarImagen
}