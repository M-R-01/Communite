import React from "react";
import { GoPlusCircle } from "react-icons/go";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import {Link} from "react-router-dom";
import axios from 'axios';

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
        <div>
            <Link to={`/dashboard/events/new/${id}`}>
            <GoPlusCircle />
            </Link>
            {events.map((event, idx) => (
                <button key={idx} onClick={() => handleGetEvent(event.id)}>
                    <p>{event.title}</p>
                    <p>{event.Creator}</p>
                </button>
            ))}
            
            <div>
                    {event ?<div>
                        <img src={`http://localhost:3000/event/img/${event.id}`} />
                    <h4>{event.title}</h4>
                    <h4>Date: {event.Date}</h4>
                    <h4>Time: {event.Time}</h4>
                    <h4>Location: {event.location}</h4>
                    <p>{event.description}</p>
                    </div> :
                    ' '}
                
            </div>
        </div>
    )
}

export default Events;