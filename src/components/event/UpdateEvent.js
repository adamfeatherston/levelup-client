import { useState, useEffect } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { loginUser } from "../../managers/AuthManager.js"
import { getGames } from "../../managers/GameManager.js"
import { updateEventDetails } from '../../managers/EventManager.js'
import { getSingleEvent } from '../../managers/EventManager.js'

export const EventEdit = () => {
    const navigate = useNavigate()
    const [games, setGames] = useState([])
    const { eventId } = useParams()
    const [chosenGame, setChosenGame] = useState(0)
    const [currentEvent, updateEvent] = useState({
        description: "",
        date: "",
        time: "",
        game: {},
    })

    //following useEffect is needed because game was serialized on the server side.
    //game {} accesses the game object which is a ForeignKey on backend.  
    //the PUT operation will need the gameId in the request. 
    // 
    useEffect(() => {
        setChosenGame(currentEvent.game.id)
    }, [currentEvent])

    useEffect(() => {
        getGames().then(setGames)
    }, [])

    useEffect(() => {
        getSingleEvent(eventId).then(updateEvent)
    }, [eventId])

    const changeEventState = (evt) => {
        const copy = { ...currentEvent }
        copy[evt.target.id] = evt.target.value
        updateEvent(copy)
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Update this Event</h2>
        <fieldset>
            <div className="form-group">
                <label htmlFor="event">Select the Game to be played:  </label>
                <select 
                    id="gameId"
                    name="gameId"
                    className="form-control"
                    value = {chosenGame}
                    onChange={(evt) => setChosenGame(evt.target.value)}>
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
                        value = {currentEvent.date}
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
                        value = {currentEvent.time} 
                        placeholder="Enter Event Start Time"
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Describe the Event: </label>
                    <input 
                        onChange={changeEventState}
                        required autoFocus 
                        type="text" id="description" 
                        className="form-control"
                        value = {currentEvent.description} 
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
                        game: parseInt(chosenGame),
                        id: currentEvent.id
                    }

                    updateEventDetails(event)
                        .then(() => navigate("/events"))
                }}
                className="btn btn-primary">Edit Me</button>
        </form>
    )
}