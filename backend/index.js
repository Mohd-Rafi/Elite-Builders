import express from 'express';
import cors from 'cors';
import mongoose from './db/dbConnection.js';
import router from './routes/routes.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
// app.use(express.static('backend/uploads'));
app.use(express.static('uploads'));
//changed
app.use(router);
app.listen(process.env.PORT, () => {
  console.log('App is Running at @ http://localhost:3000');
});
