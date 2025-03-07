import React from 'react';
import './signup.css';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate();

    const [exists, setExists] = useState(false);

    const [profile, setProfile] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [age, setAge] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [occupation, setOccupation] = useState('');
    const [pronoun, setPronoun] = useState('');

    const checkIfMobile = (value) => {
        axios.post('http://localhost:3000/mobile/check', {value})
            .then((response) =>{
                if (response.data == 'exists') {
                    setExists(true);
                    return;
                }
                else {
                    setMobile(value);
                    setExists(false);
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const handleSignup = async (e) => {
        e.preventDefault();

        const mobileRegex = /^[0-9]{10}$/;

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
        
        if ((exists != false) && !mobileRegex.test(mobile) && mobile.length != 10) {
            alert('Invalid mobile number');
            return;
        }

        if (password != confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        const data = new FormData();
        data.append('profile',profile);
        data.append('name',name);
        data.append('email',email);
        data.append('mobile',mobile);
        data.append('age',age);
        data.append('occupation',occupation);
        data.append('address',address);
        data.append('password',password);
        data.append('pronoun',pronoun);

        const chatData = {
            'username': name,
            'secret': password,
        }

        var config = {
            method: 'post',
            url: 'https://api.chatengine.io/users/',
            headers: {
                'PRIVATE-KEY': '8cfeac71-62d3-4151-a95d-ebcc60b316cf'
            },
            data : chatData
        };

        axios.post('http://localhost:3000/signup', data)
          .then((res) => {
            if (res.data == `User ${name} created successfully`) {
                axios(config)
                     .then((response) => {
                        navigate('/login');
                     })
                     .catch((err) => {
                        console.log(err);
                     })
            }
          })
          .catch((err) => {
            console.log(err);
          });
        };

    return (
        <div className='container'>
            <form className='signup-form'>
                <input type ='file' className='form-control-file' onChange={(e) => (setProfile(e.target.files[0]))} name='profile' />
                <input type="text" className='form-control' placeholder="Name" onChange={(e) => (setName(e.target.value))} required />
                <input type="text" className='form-control' placeholder="Email" onChange={(e) => (setEmail(e.target.value))} required />
                <input type='text' className='form-control' placeholder="Mobile" onChange={(e) => (checkIfMobile(e.target.value))} required />
                {exists ? (<p className='text-danger'>Number already exists</p>) : ''}
                <input type='number' className='form-control' placeholder="Age" onChange={(e) => (setAge(e.target.value))} required />
                <textarea className='form-control' placeholder="Address" onChange={(e) => (setAddress(e.target.value))} required />
                <input type="password" className='form-control' placeholder="Password" onChange={(e) => (setPassword(e.target.value))} required />
                <input type="password" className='form-control' placeholder="Confirm Password" onChange={(e) => (setConfirmPassword(e.target.value))} required />
                <input type="text" className='form-control' placeholder="Occupation" onChange={(e) => (setOccupation(e.target.value))} required />
                <input type="text" className='form-control' placeholder="Pronouns" onChange={(e) => (setPronoun(e.target.value))} required />
                <input type='submit' className='btn-primary' value="Sign Up" onClick={handleSignup} />
            </form>
        </div>
    );
}

export default Signup;