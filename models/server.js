const express = require('express');
const cors = require('cors');

class Server{

   constructor(){
      this.app = express();
      this.port = process.env.PORT;

      //middlewares
      this.middlewares();

      //Rutas
      this.routes();
   }

   middlewares(){

      //cors
      this.app.use(cors());

      //parseo lectura del body
      this.app.use(express.json());

      //directorio publico
      this.app.use(express.static('public'));

   }

   routes(){
      this.app.use('/api/usuarios', require('../routes/usuarios'));
   }

   listen(){
      this.app.listen(this.port, ()=>{
         console.log('Servidor corriendo en el puerto', this.port);
      });
   }

   

}

module.exports = Server;