import express from 'express';
import { PORT } from './config.js';
import mysql from 'mysql';
import cors from 'cors';
import bcrypt from 'bcrypt';

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

const saltRounds = 10;

app.post('/signup', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const mobile = req.body.mobile;
    const age = req.body.age;
    const address = req.body.address;
    const password = req.body.password;
    const pronoun = req.body.pronoun;

    console.log(name, email, mobile, age, address, password, pronoun);

    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
            console.log(err);
        } else {
            db.query('INSERT INTO users (name, email, mobile, Age, Address, Password, pronouns) VALUES (?,?,?,?,?,?,?)',
                [name, email, mobile, age, address, hash, pronoun], (err, result) => {
                if (err) console.log(err);
                res.status(200).send('User ' + name + 'created successfully');
                console.log(res);
            })
        }
    })
})


