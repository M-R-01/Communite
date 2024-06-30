import React from "react";
import { GoPlusCircle } from "react-icons/go";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import {Link} from "react-router-dom";
import axios from 'axios';
import './events.css';
import SideNav from "../components/Sidebarnav";

const Events = () => {
    const { id } = useParams();

    const [events, setEvents] = useState([]);
    const [event, setEvent] = useState();

    useEffect(() => {
        axios.get(`http://localhost:3000/events`)
           .then(res => {
                setEvents(res.data);
            })
           .catch(err => {
                console.log(err);
            })
    }, [])


    const handleGetEvent = (id) => {
        axios.get(`http://localhost:3000/event/${id}`) 
             .then((response) => {
                setEvent(response.data);
             })
             .catch((err) => {
                console.log(err);
             });
    }

    
    return (
        <div className="total-container">
            <SideNav id = {id}/>
            <div className="events-container">
            <div className="event-nav">
                <Link to={`/dashboard/events/new/${id}`}>
                    <GoPlusCircle className="new-event"/>
                    </Link>
                    {events.map((event, idx) => (
                        <button key={idx} className="event-button"onClick={() => handleGetEvent(event.id)}>
                            {event.title}
                        </button>
                    ))}
            </div>
            
            
            <div>
                    {event ?<div>
                        <div className="event-img">
                        <img src={`http://localhost:3000/event/img/${event.id}`} />
                        </div>
                    <div className="event-details">
                        <h4 className="event-title">{event.title}</h4>
                        <div className="event-info">
                            <h4>Date: {event.Date}</h4>
                            <h4>Time: {event.Time}</h4>
                            <h4>Location: {event.location}</h4>
                            <span>{event.description}</span>
                        </div>
                        
                        </div>
                        </div>
                     :
                    ' '}
                
            </div>
        </div>
        </div>
        
    )
}

export default Events;