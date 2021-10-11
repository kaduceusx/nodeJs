
const mongoose = require('mongoose');

const dbConection = async()=>{

   /* try {
      await mongoose.connect(process.env.MONGODB_CNN, {
         useNewUrlParser: true,
         useUnifiedTopology: true,
         useCreateIndex: true,
         useFindAndModify: false
      });
      console.log('Base de datos online');
   } catch (error) {
      console.log('EL error ocurrido es: ',error);
      throw new Error('Error en la conexion de la base de datos');
   } */

   mongoose.connect(process.env.MONGODB_CNN,{
 
      useNewUrlParser: true,
      useUnifiedTopology: true
 
   })
   .then(()=> console.log('base de datos ONLINE'))
   .catch(err => console.log('No se pudo conectar',err));

}

module.exports = {
   dbConection
}