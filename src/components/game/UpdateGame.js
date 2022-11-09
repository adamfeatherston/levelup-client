import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { loginUser } from "../../managers/AuthManager.js"
import { updateGameDetails, getGameTypes, getSingleGame } from '../../managers/GameManager.js'

export const GameEdit = () => {
    const navigate = useNavigate()
    const [gameTypes, setGameTypes] = useState([])

    const [currentGame, updateGame] = useState({
        title: "",
        maker: "",
        numberOfPlayers: "",
        skillLevel: 1,
        gameTypeId: 0
    })

    useEffect(() => {
        getGameTypes().then(setGameTypes)
    }, [])

    const changeGameState = (evt) => {
        const copy = { ...currentGame }
        copy[evt.target.id] = evt.target.value
        updateGame(copy)
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Register New Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input 
                        onChange={changeGameState}
                        required autoFocus 
                        type="text" id="title" 
                        className="form-control" 
                        placeholder="Enter Game Title"   
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="maker">Maker: </label>
                    <input 
                        onChange={changeGameState}
                        required autoFocus 
                        type="text" id="maker" 
                        className="form-control" 
                        placeholder="Enter Game Manufacturer"
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="number_of_players">Number of Players: </label>
                    <input 
                        onChange={changeGameState}
                        required autoFocus 
                        type="text" id="numberOfPlayers" 
                        className="form-control" 
                        placeholder="Enter Number"
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="skill_level">Skill Level: </label>
                    <input 
                        onChange={changeGameState}
                        required autoFocus 
                        type="text" id="skillLevel" 
                        className="form-control" 
                        placeholder="Enter a skill level of the game."
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="game_type">Select the Game Type:  </label>
                    <select 
                        id="gameTypeId"
                        name="gameTypeId"
                        className="form-control"
                        onChange={changeGameState}>
                        <option className="form-drop"id={"gameTypeId"}>Please select the Game Type...</option>
                        {
                            gameTypes.map(type => {
                                return <option value={type.id}>{type.label}</option>
                            })
                        }
                    </select>
                </div>
            </fieldset>


            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const game = {
                        title: currentGame.title,
                        maker: currentGame.maker,
                        numberOfPlayers: parseInt(currentGame.numberOfPlayers),
                        skillLevel: parseInt(currentGame.skillLevel),
                        gameTypeId: parseInt(currentGame.gameTypeId)
                    }

                    // Send POST request to your API
                    createGame(game)
                        .then(() => navigate("/games"))
                }}
                className="btn btn-primary">Create</button>
        </form>
    )
}