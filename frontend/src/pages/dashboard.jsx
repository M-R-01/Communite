import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import SideNav from "../components/Sidebarnav";
import './dashboard.css';


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
        <div className="dashboard-container">
            <SideNav id={id}/>
            <div className="profile"><img src={`http://localhost:3000/user/profile/${id}`} /></div>
            <Link to={`/dashboard/user/edit/${user.id}`}>
                <button className="button"><MdEdit fill='#d60dab' /></button>
            </Link>  
            <Link to={`/dashboard/user/delete/${user.id}`} >
                <button className="button"><MdDelete fill='#d60dab' /></button>
            </Link>
            <div className='content'>
                <h4>Hola,</h4>
                <h2 className="name">{user.name}!!</h2>
                <div className="info">
                    <p>Age: {user.Age}</p>
                    <p>Pronouns: {user.pronouns} </p>
                </div>
                <div className="info">
                    <p>Email: {user.email}</p>
                    <p>Mobile: {user.mobile}</p>
                </div>
                
                <div className="info">
                    <p>Occupation: {user.occupation}</p>
                    <p>Residence: {user.Address}</p>
                </div>
                
            </div>
            
        </div>
    )
}

export default Dashboard;