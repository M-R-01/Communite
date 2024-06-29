import React from 'react';
import { useState } from 'react';
import axios from 'axios';

const Signup = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [age, setAge] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [pronoun, setPronoun] = useState('');

    const handleSignup = async (e) => {
        e.preventDefault();

        if (name == '' || email == '' || age == '' || address == '' || password == '' || confirmPassword == '' || pronoun == '') {
            alert('Please fill in all fields');
            return;
        }

        if (password.length < 8) {
            alert('Password must be at least 8 characters');
            return;
        }

        if (!email.includes('@')) {
            alert('Invalid email');
            return;
        }

        if (mobile.length >10) {
            alert('Invalid mobile number');
            return;
        }

        if (password != confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        const data = {
            name: name,
            email: email,
            mobile: mobile,
            age: age,
            address: address,
            password: password,
            pronoun: pronoun,
        }

        axios.post('http://localhost:3000/signup', data)
          .then((res) => {
            if (res.data) {
                alert('Signup successful');
            }
          })
          .catch((err) => {
            console.log(err);
          });
        };

    return (
        <div>
            <form>
                <input type="text" placeholder="Name" onChange={(e) => (setName(e.target.value))} required />
                <input type="text" placeholder="Email" onChange={(e) => (setEmail(e.target.value))} required />
                <input type='text' placeholder="Mobile" onChange={(e) => (setMobile(e.target.value))} required />
                <input type='number' placeholder="Age" onChange={(e) => (setAge(e.target.value))} required />
                <textarea placeholder="Address" onChange={(e) => (setAddress(e.target.value))} required />
                <input type="password" placeholder="Password" onChange={(e) => (setPassword(e.target.value))} required />
                <input type="password" placeholder="Confirm Password" onChange={(e) => (setConfirmPassword(e.target.value))} required />
                <input type="text" placeholder="Pronouns" onChange={(e) => (setPronoun(e.target.value))} required />
                <input type='submit' placeholder="Sign Up" onChange={handleSignup} />
            </form>
        </div>
    );
}

export default Signup;