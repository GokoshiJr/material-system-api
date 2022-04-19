require('dotenv').config(); // traernos las variables de entorno del .env
const mongoose = require('mongoose');

mongoose.connection.on('open', () => {
  console.log('DB connected');
});

// conexion a la db de mongo dependiendo si usamos +srv
async function connectDb({host, port, name}, srv){
  try {
    let uri = '';
    if (srv) {
      uri = `mongodb+srv://${host}:${port}/${name}`;
    } else {
      uri = `mongodb://${host}:${port}/${name}`;
    }
    await mongoose.connect(uri, { useNewUrlParser: true });
  } catch (error) {
    console.log(error);
  }
}

module.exports = connectDb;
