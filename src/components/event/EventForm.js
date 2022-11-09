import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { loginUser } from "../../managers/AuthManager.js"
import { getGames } from "../../managers/GameManager.js"
import { createEvent } from '../../managers/EventManager.js'


export const EventForm = () => {
    const navigate = useNavigate()
    const [games, setGames] = useState([])

    const [currentEvent, updateEvent] = useState({
        description: "",
        date: "",
        time: "",
        gameId: 0
    })

    useEffect(() => {
        getGames().then(setGames)
    }, [])

    const changeEventState = (evt) => {
        const copy = { ...currentEvent }
        copy[evt.target.id] = evt.target.value
        updateEvent(copy)
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Register New Game</h2>
        <fieldset>
            <div className="form-group">
                <label htmlFor="event">Select the Game to be played:  </label>
                <select 
                    id="gameId"
                    name="gameId"
                    className="form-control"
                    onChange={changeEventState}>
                    <option className="form-drop"id={"gameId"}>Please select a Game...</option>
                    {
                        games.map(game => {
                            return <option value={game.id}>{game.title}</option>
                        })
                    }
                </select>
            </div>
        </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">When is the Event? </label>
                    <input 
                        onChange={changeEventState}
                        required autoFocus 
                        type="date" id="date" 
                        className="form-control" 
                        placeholder="Enter Event Date"   
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="time">What time is the Event? </label>
                    <input 
                        onChange={changeEventState}
                        required autoFocus 
                        type="time" id="time" 
                        className="form-control" 
                        placeholder="Enter Event Start Time"
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Number of Players: </label>
                    <input 
                        onChange={changeEventState}
                        required autoFocus 
                        type="text" id="description" 
                        className="form-control" 
                        placeholder="Provide a few details like where the event will take place."
                    />
                </div>
            </fieldset>

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const event = {
                        description: currentEvent.description,
                        date: currentEvent.date,
                        time: currentEvent.time,
                        gameId: parseInt(currentEvent.gameId)
                    }

                    createEvent(event)
                        .then(() => navigate("/events"))
                }}
                className="btn btn-primary">Create</button>
        </form>
    )
}