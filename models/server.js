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
      this.app.use('/api/buscar', require('../routes/buscar'));
      this.app.use('/api/auth', require('../routes/auth'));
      this.app.use('/api/usuarios', require('../routes/usuarios'));
      this.app.use('/api/categorias', require('../routes/categorias'));
      this.app.use('/api/productos', require('../routes/productos'));
   }

   listen(){
      this.app.listen(this.port, ()=>{
         console.log('Servidor corriendo en el puerto', this.port);
      });
   }

   

}

module.exports = Server;