require('dotenv').config();
const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
const connectDb = require('./database/mongodb');
const { appConfig, dbConfig } = require('./config');

// Initial Setup
const {
  createRoles,
  createCampaignType
} = require('./libs/initialSetup');

const app = express();

// middlewares
app.use(morgan('dev')); // morgan en modo dev para ver las request en la consola
app.use(express.json()); // para recibir req json
app.use(express.urlencoded({ extended: false })); // para recibir req urlencoded
app.use('/public', express.static(`${__dirname}/storage/img/`)); // sirve las img que estan en storage a la ruta public
app.use(cors()); // para que responda peticiones desde otros hosts

// routes
app.use('/api/auth', require('./routes/Auth'));
app.use('/api/user', require('./routes/User'));
app.use('/api/employee', require('./routes/Employee'));
app.use('/api/client', require('./routes/Client'));
app.use('/api/campaign', require('./routes/Campaign'));
app.use('/api/projection', require('./routes/Projection'));
app.use('/api/report', require('./routes/Report'));
// seeder
app.use('/api/seed', require('./seeds/SeedRoute'));

app.use('/', (req, res) => {
  res.send('Hello World!');
})

async function initApp({ port=4000 }, dbConfig) {
  try {
    await connectDb(dbConfig);
    await createRoles();
    await createCampaignType();
    app.listen(port, () => {
      console.log(`Server on port ${port}`);
    })
  } catch (error) {
    console.error(error);
    process.exit(0);
  }
}

initApp(appConfig, dbConfig);
