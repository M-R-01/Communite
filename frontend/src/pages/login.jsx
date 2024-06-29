import React from "react";
import { useState } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Login = () => {

    const navigate = useNavigate();

    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();


        const data = {
            mobile: mobile,
            password: password
        }

        axios.post('http://localhost:3000/login', data)
             .then((response) => {
                if (response.data == 'Login successful') {
                    navigate('/dashboard');
                }
             })
             .catch((err) => {
                console.log(err);
             });
    }


    return (
        <div>
            <form>
                <input type="text" placeholder="Mobile" onChange={(e) => {setMobile(e.target.value)}} required />
                <input type="password" placeholder="password" onChange={(e) => {setPassword(e.target.value)}} required />
                <Link to='/signup'>Haven't registered yet? Signup here</Link>
                <Link to='/forgot-password'>Forgot Password?</Link>
                <input type="submit" onClick={handleLogin} value="Login" />
            </form>
        </div>
    )
}

export default Login;