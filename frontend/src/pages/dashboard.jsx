import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const Dashboard = () => {

    const { id } = useParams();

    const [user, setUser] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3000/user/${id}`)
           .then(res => {
                setUser(res.data);
            })
           .catch(err => {
                console.log(err);
            })
    }, [])

    console.log(user);  

    return (
        <div>
            <div><img src={`http://localhost:3000/user/profile/${id}`} /></div>
            <h4>Hola,</h4>
            <h2>{user.name}</h2>
            <p>{user.Age} -{user.pronouns} </p>
            <p>{user.email}</p>
            <p>{user.mobile}</p>
            <p>{user.occupation}</p>
            <p>{user.Address}</p>
            <Link to={`/dashboard/user/edit/${user.id}`}>
                <button>Edit</button>
            </Link>  
            <Link to={`/dashboard/user/delete/${user.id}`} >
                <button>Delete Account</button>
            </Link>
            
            <button>Logout</button>
        </div>
    )
}

export default Dashboard;