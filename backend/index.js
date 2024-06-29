import express from 'express';
import { PORT } from './config.js';
import mysql from 'mysql';
import cors from 'cors';
import bcrypt from 'bcrypt';
import twilio from 'twilio';
import multer from 'multer';

//Twilio configuration
const accountSid = 'AC56b8e536e377b281753d01a7ed4f42af';
const authToken = 'ce36772c4d659d3945bcdf35b10ac293';

const client = twilio(accountSid, authToken);

const sendSMS = (mobile, message) => {
    client.messages.create({
        body: message,
        to: '+91' + mobile,
        from: '+14156304233'
    })
      .catch(err => console.log(err));
}


const app = express();

app.use(express.json());
app.use(cors());

//Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'communite'
})

//Multer middleware
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/profile'); // Specify the directory to save the uploaded files
      },
      filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Generate a unique filename
      }
})

const upload = multer({ storage: storage });

//Port
app.listen(PORT, (err) => {
    if (err)  console.log(err);
    console.log(`Server is running on port ${PORT}`);
});

const saltRounds = 10;


//Mobile number check
app.post('/mobile/check', (req, res) => {
    const mobile = req.body.value;

    db.query('select * from users where mobile = ?', [mobile], (err, result) => {
        if (err) console.log(err);
        if (result.length > 0) {
            res.send('exists');
        } else {
            res.send('not found');
        }
    }) 
})

//Signup endpoint
app.post('/signup', upload.single('profile'), (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const mobile = req.body.mobile;
    const age = req.body.age;
    const profile = req.body.profile;
    const address = req.body.address;
    const password = req.body.password;
    const pronoun = req.body.pronoun;


    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
            console.log(err);
        } else {
            db.query('INSERT INTO users (name, email, mobile, Age, Address, Password, pronouns, profile) VALUES (?,?,?,?,?,?,?,?)',
                [name, email, mobile, age, address, hash, pronoun, req.file.path], (err, result) => {
                if (err) console.log(err);
                res.status(200).send('User ' + name + ' created successfully');
            })
        }
    })
})

//Login endpoint
app.post('/login', (req, res) => {
    const mobile = req.body.mobile;
    const password = req.body.password;

    db.query('select * from users where mobile =?', [mobile], (err, result) => {
        if (err) console.log(err);
        if (result) {
            bcrypt.compare(password, result[0].Password, (err, result) => {
                if (err) console.log(err);
                if (result) {
                    res.status(200).send('Login successful');
                } else {
                    res.status(500).send('Login failed');
                }
            })
        } else {
            res.status(404).send('User not found');
        }
    })
})

//Forgot Password endpoint
app.post('/forgot-password', (req, res) => {
    const mobile = req.body.mobile;

    db.query('select * from users where mobile =?', [mobile], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error retrieving user');
        };

        if (result.length > 0) {
            const name = result[0].name;
            const mobile = result[0].mobile;

            const newPassword = name.substring(0, 2) + mobile.substring(0, 6);

            const message = `Hi ${name}, your new password is ${newPassword}`;
            sendSMS(mobile, message);

            bcrypt.hash(newPassword, saltRounds, (err, hash) => {
                if (err) {
                    console.log(err);
                } else {
                    db.query('update users set password =? where mobile =?', [hash, mobile], (err, result) => {
                        if (err) {
                            console.log(err);
                        } else {
                            res.status(200).send('Password updated successfully');
                        }
                    })
                }
            })
            
        } else {
            res.status(404).send('User not found');
        }
    })
})
