import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NewEvent = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [location, setLocation] = useState('');

    const handleCreateEvent = async(e) => {
        e.preventDefault();

        console.log(id, title, description, image, date, time, location)

        const eventData = new FormData();
        eventData.append('title', title);
        eventData.append('description', description);
        eventData.append('image', image);
        eventData.append('date', date);
        eventData.append('time', time);
        eventData.append('location', location);

        axios.post(`http://localhost:3000/event/create/${id}`, eventData)
                .then((res) => {
                    if (res.data == 'Event created successfully') {
                        navigate(`/dashboard/events/${id}`);
                    }
                }).catch((err) => {
                    console.log(err);
                })
    }

    return (
        <div>
            <form onSubmit={handleCreateEvent}>
                <div className="form-group">
                    <label htmlFor="Image">Event Image</label>
                    <input type="file" className="form-control" onChange={(e)=>(setImage(e.target.files[0]))} id="title" />
                </div>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input type="text" className="form-control" onChange={(e)=>(setTitle(e.target.value))} id="title" />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <input type="text" className="form-control" onChange={(e)=>(setDescription(e.target.value))} id="description" />
                </div>
                <div className="form-group">
                    <label htmlFor="date">Date</label>
                    <input type="date" className="form-control" onChange={(e)=>(setDate(e.target.value))} id="date" />
                </div>
                <div className="form-group">
                    <label htmlFor="time">Time</label>
                    <input type="time" className="form-control" onChange={(e)=>(setTime(e.target.value))} id="time" />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Location</label>
                    <input type="text" className="form-control" onChange={(e)=>(setLocation(e.target.value))} id="description" />
                </div>
                <input type="submit" value='Create Event' />
            </form>
        </div>
    );
};


export default NewEvent;