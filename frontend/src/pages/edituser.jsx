import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

const EditUser = () => {
        const {id} = useParams();

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

        useEffect(() => {
            axios.get(`http://localhost:3000/user/${id}`)
               .then((response) => {
                    setProfile(response.data.profile);
                    setName(response.data.name);
                    setEmail(response.data.email);
                    setMobile(response.data.mobile);
                    setAge(response.data.Age);
                    setAddress(response.data.Address);
                    setOccupation(response.data.occupation);
                    setPronoun(response.data.pronouns);
                })
               .catch((error) => {
                    console.log(error);
                })
        }, [])

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

        const handleEditUser = async (e) => {
            e.preventDefault();
    
            const mobileRegex = /^[0-9]{10}$/;
    
    
            if (password.length != 0 && password.length < 8) {
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
    
            axios.put(`http://localhost:3000/user/edit/${id}`, data)
              .then((res) => {

                if (res.data == `User ${name} updated successfully`) {
                    navigate(`/dashboard/user/${id}`);
                }
              })
              .catch((err) => {
                console.log(err);
              });
            };

    return (
        <div>
            <div>
            <form>
                <input type = 'file' onChange={(e) => (setProfile(e.target.files[0]))} name='profile' />
                <input type="text"  value={name} placeholder="Name" onChange={(e) => (setName(e.target.value))} required />
                <input type="text" value={email} placeholder="Email" onChange={(e) => (setEmail(e.target.value))} required />
                <input type='text' value={mobile} placeholder="Mobile" onChange={(e) => (checkIfMobile(e.target.value))} required />
                {exists ? (<p>NUmber already exists</p>) : ''}
                <input type='number' value={age} placeholder="Age" onChange={(e) => (setAge(e.target.value))} required />
                <textarea placeholder="Address" value={address} onChange={(e) => (setAddress(e.target.value))} required />
                <input type="password" placeholder="Password" onChange={(e) => (setPassword(e.target.value))} required />
                <input type="password" placeholder="Confirm Password" onChange={(e) => (setConfirmPassword(e.target.value))} required />
                <input type="text" value={occupation} placeholder="Occupation" onChange={(e) => (setOccupation(e.target.value))} required />
                <input type="text" value={pronoun} placeholder="Pronouns" onChange={(e) => (setPronoun(e.target.value))} required />
                <input type='submit' value="Save changes" onClick={handleEditUser} />
            </form>
        </div>
        </div>
    );
};

export default EditUser;