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
                if (response.data.message == 'Login successful') {
                    const id = response.data.id;
                    const authObject = { 'Project-ID': '00d688c1-a94c-40a3-b9bc-9bb03b6beb8f', 'User-Name': response.data.name, 'User-Secret': password};

                    try {
                        axios.get('https://api.chatengine.io/chats', { headers: authObject });
                  
                        localStorage.setItem('username', response.data.name);
                        localStorage.setItem('password', password);
                        navigate(`/dashboard/user/${id}`);
                      } catch (err) {
                        setError('Oops, incorrect credentials.');
                      }
                    
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