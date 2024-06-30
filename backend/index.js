import express from 'express';
import { PORT } from './config.js';
import mysql from 'mysql';
import cors from 'cors';
import bcrypt from 'bcrypt';
import twilio from 'twilio';
import multer from 'multer';
import path from 'path';

//Twilio configuration
const accountSid = 'AC56b8e536e377b281753d01a7ed4f42af';
const authToken = '2dbad0edb45e15aa76909de0e2c0d840';

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
    const occupation = req.body.occupation;


    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
            console.log(err);
        } else {
            db.query('INSERT INTO users (name, email, mobile, Age, Address, Password, pronouns, profile, occupation) VALUES (?,?,?,?,?,?,?,?,?)',
                [name, email, mobile, age, address, hash, pronoun, req.file.path, occupation], (err, result) => {
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
            const id = result[0].id;
            const name = result[0].name;
            bcrypt.compare(password, result[0].Password, (err, result) => {
                if (err) console.log(err);
                if (result) {
                    res.status(200).json({message: 'Login successful', id: id, name: name});
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


//Get user
app.get('/user/:id', (req, res) => {
    const id = req.params.id;

    db.query(`SELECT * FROM users WHERE id = ${id}`, (err, result) => {
        if (err) console.log(err);
        if (result) {
            res.status(200).send(result[0]);
        }
    })
    
})


app.get('/user/profile/:id', (req, res) => {
    const id = req.params.id;

    db.query(`SELECT profile FROM users WHERE id = ${id}`, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error retrieving product image');
        }
        const imagePath = result[0].profile;
        res.sendFile(path.resolve(imagePath)); 
    })
})


app.delete('/user/delete/:id', (req, res) => {
    const id = req.params.id;

    db.query(`DELETE FROM users WHERE id = ${id}`, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error deleting user');
        }
        res.status(200).send('User deleted successfully');
    })
});

app.put('/user/edit/:id',upload.single('profile'), (req,res) => {
    const id = req.params.id;
    const name = req.body.name;
    const email = req.body.email;
    const mobile = req.body.mobile;
    const age = req.body.age;
    const password = req.body.password;
    const address = req.body.address;
    const pronoun = req.body.pronoun;
    const occupation = req.body.occupation;

    if (req.file) {
        const profile = req.file.path;
        if (password != '') {
            bcrypt.hash(password, saltRounds, (err, hash) => {
                if (err) {
                    console.log(err);
                } else {
                    db.query('update users set name =?, email =?, mobile =?, Age =?, Address =?, Password =?, pronouns =?, profile =?, occupation =? where id =?',
                        [name, email, mobile, age, address, hash, pronoun, profile, occupation, id], (err, result) => {
                        if (err) console.log(err);
                        res.status(200).send('User '+ name +' updated successfully');
                    })
                }
            })
        } else {
            db.query('update users set name =?, email =?, mobile =?, Age =?, Address =?, pronouns =?, profile =?, occupation =? where id =?',
                [name, email, mobile, age, address, pronoun, profile, occupation, id], (err, result) => {
                if (err) console.log(err);
                res.status(200).send('User '+ name +' updated successfully');
            })
        }
    } else {
        if (password!= '') {
            bcrypt.hash(password, saltRounds, (err, hash) => {
                if (err) {
                    console.log(err);
                } else {
                    db.query('update users set name =?, email =?, mobile =?, Age =?, Address =?, Password =?, pronouns =?, occupation =? where id =?',
                        [name, email, mobile, age, address, hash, pronoun, occupation, id], (err, result) => {
                        if (err) console.log(err);
                        res.status(200).send('User '+ name +' updated successfully');
                    })
                }
            })
        } else {
            db.query('update users set name =?, email =?, mobile =?, Age =?, Address =?, pronouns =?, occupation =? where id =?',
                [name, email, mobile, age, address, pronoun, occupation, id], (err, result) => {
                if (err) console.log(err);
                res.status(200).send('User '+ name +' updated successfully');
            })
        }
    }
})