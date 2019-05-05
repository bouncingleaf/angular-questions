require('dotenv').config();
import express from 'express';
// import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
// import './initialize-db';
import { questionRoutes } from './questions';

const PORT = process.env.PORT || 7777;

const app = express();

// Set up bodyParser to handle forms
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

questionRoutes(app);

app.use(express.static(path.resolve(__dirname, '../../dist/angular-questions/')));
app.get('/*', (req,res) => {
  res.sendFile(path.resolve(__dirname, '../index.html'));
});

// Start listening on the specified port
app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
