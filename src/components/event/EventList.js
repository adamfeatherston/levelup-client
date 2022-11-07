import React, { useEffect, useState } from "react"
import { getEvents } from "../../managers/EventManager.js"

export const EventList = (props) => {
    const [ events, setEvents ] = useState([])

    useEffect(() => {
        getEvents().then(data => setEvents(data))
    }, [])

    return (
        <article className="events">
            {
                events.map(event => {
                    return <section key={`event--${event.id}`} className="event">
                        <div className="event__gamePlayed">We will be playing {event.game.title}</div>
                        <div className="event__host">{event.organizer.full_name} is hosting the event.</div>
                        <div className="event__description">{event.description}</div>
                        <div className="event__date">We will meet on: {event.date}</div>
                        <div className="event__time">We will start playing at: {event.time}</div>
                    </section>
                })
            }
        </article>
    )
}

