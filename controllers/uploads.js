
const path = require('path');
const {v4: uuidv4} = require('uuid');

const { response } = require("express");


const cargarArchivo = (req, res=response)=>{

   //console.log(req.files);

   if(!req.files || Object.keys(req.files).length === 0 || !req.files.archivo){
      res.status(400).json({
         msg: 'No hay archivos en la peticion'
      });
      return ;
   }

   const {archivo} = req.files;
   const nombreCortado = archivo.name.split('.');
   const extension = nombreCortado[nombreCortado.length - 1];

   /* -------------------------- validar la extension -------------------------- */
   const extensionesPermitidas = ['jpg', 'png', 'gif'];

   if(!extensionesPermitidas.includes(extension)){
      return res.status(400).json({
         msg: `La extension ${extension} no es permitida, Las permitidas son: ${extensionesPermitidas}`
      })
   }

   // res.json({
   //    extension
   // })
   
   const nombreTemp = uuidv4() + '.' + extension;
   const uploadPath = path.join(__dirname, '../uploads/', nombreTemp);

   archivo.mv(uploadPath, (err)=>{
      if(err){
         return res.status(500).json({
            err   
         });
      }

      res.json({
         msg: 'El archivo se subio al path: ' + uploadPath
      })
   });

}

module.exports = {
   cargarArchivo
}