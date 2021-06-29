require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.port || 8000;
const connection = require('./app.js')

const badges = require('./routes/badges');
const children = require('./routes/children');
const tasks = require('./routes/tasks');
const children_badges = require('./routes/children_badges')
const children_names = require('./routes/children_names')

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use('/badges', badges);
app.use('/children', children);
app.use('/tasks', tasks);
app.use('/children_badges' , children_badges);
app.use('/children_names', children_names);

app.get('/', (request, response) => {
  response.json({message: 'Bienvenue sur Express'} );
});

app.listen(port, (err) => {
  if (err) {
    throw new Error(`An error occurred: ${err.message}`);
  }
  console.log(`Server is listening on ${port}`);
});

module.exports = app; 
