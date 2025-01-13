'use client'
import { useState, useEffect } from 'react';
import apiInstance from '../api_inst';

export default function Events() {
    // localStorage.setItem('_token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJhcmlmQGdtYWlsLmNvbSIsImlhdCI6MTczNjc4Nzk4MX0.z8VMKQzuQzNRZQ35qOurxZk_MAIfrUPioAkwUCxERXI');
    const [events, setEvents] = useState([]);
    const token = localStorage.getItem('_token');
    console.log(token)
    const fetchEvents = async () => {
        try {
            const response = await apiInstance.get('/events', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            setEvents(response.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    return (
        <div>
            {events.map((event) => (
                <div key={event.id}>
                    <h3>{event.name}</h3>
                    <p>{event.location}</p>
                </div>
            ))}
        </div>
    );
}
