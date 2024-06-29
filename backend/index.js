import express from 'express';
import { PORT } from './config.js';
import mysql from 'mysql';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'communite'
})

app.listen(PORT, (err) => {
    if (err)  console.log(err);
    console.log(`Server is running on port ${PORT}`);
});



