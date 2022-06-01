require('dotenv').config(); // traernos las variables de entorno del .env
const mongoose = require('mongoose');

mongoose.connection.on('open', () => {
  console.log('DB connected');
});

// conexion a la db de mongo dependiendo si usamos +srv (cluster)
async function connectDb({host, port, name, srv}){
  try {
    let uri = '';
    if (srv === 'true') {
      uri = `mongodb+srv://${host}:${port}/${name}`;
    } else if (srv === 'false') {
      uri = `mongodb://${host}:${port}/${name}`;
    }
    await mongoose.connect(uri, { useNewUrlParser: true });
  } catch (error) {
    console.log(error);
    process.exit(0);
  }
}

module.exports = connectDb;
