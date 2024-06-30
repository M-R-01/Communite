import React from "react";
import { useState } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';


const DeleteUser = () => {

    const { id } = useParams();

    const [password, setPassword] = useState('');

    const handleDeleteUser = async (e) => {
        e.preventDefault();

        axios.delete(`http://localhost:3000/user/delete/${id}`)
             .then((response) => {
                alert(response.data);
                console.log(response);
             })
             .catch((err) => {
                console.log(err);
             });
    }

    return (
        <div>
            <h3>Enter your password:</h3>
            <input type="password" placeholder="Password"/>
            <button onClick={handleDeleteUser}>Delete</button>
        </div>
    );
};

export default DeleteUser;