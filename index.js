const express = require('express');
const morgan = require('morgan');
const { mongoose } = require('./database/db');
const app = express();

// settings
app.set('port', process.env.PORT || 3000);

// middlewares
app.use(morgan('dev'));
app.use(express.json());

// routes
app.use('/api/todo', require('./routes/todoController'));

app.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`);
})
