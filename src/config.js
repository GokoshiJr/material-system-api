const config = {
  appConfig: {
    host: process.env.APP_HOST,
    port: process.env.APP_PORT
  },
  dbConfig: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    name: process.env.DB_NAME
  },
  secret: process.env.SECRET
}

module.exports = config;
