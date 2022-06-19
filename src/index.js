require('dotenv').config();
const { createRoles } = require('./libs/initialSetup')
const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
const connectDb = require('./database/mongodb');
const { appConfig, dbConfig } = require('./config');

const app = express();

// middlewares
app.use(morgan('dev')); // morgan en modo dev para ver las request en la consola
app.use(express.json()); // para recibir req json
app.use(express.urlencoded({ extended: false })); // para recibir req urlencoded
app.use('/public', express.static(`${__dirname}/storage/img/`)); // sirve las img que estan en storage a la ruta public
app.use(cors()); // para que responda peticiones desde otros hosts

// routes
app.use('/api/product', require('./routes/Product'));
// app.use('/api/auth', require('./routes/auth'));
// app.use('/api/user', require('./routes/user'));

app.use('/', (req, res) => {
  res.send('Epa Alex')
})

async function initApp({ port=4000 }, dbConfig) {
  try {
    await connectDb(dbConfig);
    createRoles();
    app.listen(port, () => {
      console.log(`Server on port ${port}`);
    })
  } catch (error) {
    console.error(error);
    process.exit(0);
  }
}

initApp(appConfig, dbConfig);
