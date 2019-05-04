require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 7777;
// const routes = require('./routes/index');

const app = express();

// Set up bodyParser to handle forms
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
// app.use('/', routes);

// Set the location of static files
// if (process.env.NODE_ENV == 'production') {
  app.use(express.static(path.resolve(__dirname, '../../dist/angular-questions/')));
  app.get('/*', (req,res) => {
    res.sendFile(path.resolve('index.html'));
  });
// }

// Start listening on the specified port
app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
