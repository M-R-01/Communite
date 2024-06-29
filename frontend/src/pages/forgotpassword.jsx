import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {

    const navigate = useNavigate();

    const [mobile, setMobile] = useState('');


    const handleForgotPassword = async (e) => {
        e.preventDefault();

        const mobileRegex = /^[0-9]{10}$/;

        if (mobile == '') {
            alert('Please enter your mobile number');
            return;
        }

        if (!mobileRegex.test(mobile)) {
            alert('Invalid mobile number');
            return;
        }

        axios.post('http://localhost:3000/forgot-password', {mobile})
            .then((res) => {
                if (res.data) {
                    alert(res.data);
                    if (res.data == 'Password updated successfully') {
                        navigate('/login');
                    }
                }
            })
           .catch((err) => {
                console.log(err);
           })
    }


    return (
        <div>
            <input type="text" placeholder="Mobile" onChange={(e) => (setMobile(e.target.value))} />
            <input type="submit" value="Submit" onClick={handleForgotPassword} />
        </div>
    );
}

export default ForgotPassword;