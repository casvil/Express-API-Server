//Main starting point of the application
require('dotenv').config();

const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const router = require('./router');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// DB Setup
mongoose.connect(process.env.MONGOBD_URI);

// App Setup
app.use(cors());
app.use(morgan('combined')); // login framework middleware
app.use(bodyParser.json({ type: '*/*' })); // parse requests into json middleware
router(app);

// Server Setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);

server.listen(port);

console.log('Server listening on:', port);
