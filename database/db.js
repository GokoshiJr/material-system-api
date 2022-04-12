const mongoose = require('mongoose');
const dotenv = require('dotenv').config(); // traernos las variables de entorno del .env

mongoose.connect(process.env.MONGO_ATLAS_URI)
.then(db => {
  console.log('Db is connected');
})
.catch(err => {
  console.log(err);
});

module.exports = mongoose;
