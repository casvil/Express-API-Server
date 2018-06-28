//Main starting point of the application
import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import router from './router';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
const a = 2;

// DB Setup
mongoose.connect('mongodb://localhost:27017/mama-recipes');

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
