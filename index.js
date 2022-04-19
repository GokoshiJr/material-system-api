const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
const connectDb = require('./database/mongodb');
const { appConfig, dbConfig } = require('./config');
const app = express();

// middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/public', express.static(`${__dirname}/storage/img/`));
app.use(cors()); // para que responda peticiones desde otros hosts

// routes
app.use('/api/product', require('./routes/Product'));

async function initApp({ port=3000 }, dbConfig) {
  try {
    await connectDb(dbConfig, srv=true);
    app.listen(port, () => {
      console.log(`Server on port ${port}`);
    })
  } catch (error) {
    console.error(error);
    process.exit(0);
  }
}

initApp(appConfig, dbConfig);
