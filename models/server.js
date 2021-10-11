const express = require('express');
const cors = require('cors');

const {dbConection} = require('../database/config.db');

class Server{

   constructor(){
      this.app = express();
      this.port = process.env.PORT;

      //Conectar DB
      this.conectarDB();
      

      //middlewares
      this.middlewares();

      //Rutas
      this.routes();
   }

   async conectarDB(){

      await dbConection();

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