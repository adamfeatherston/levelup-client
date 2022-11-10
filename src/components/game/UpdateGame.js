import { useState, useEffect } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { loginUser } from "../../managers/AuthManager.js"
import { updateGameDetails, getGameTypes, getSingleGame } from '../../managers/GameManager.js'

export const GameEdit = () => {
    const navigate = useNavigate()
    const [gameTypes, setGameTypes] = useState([])
    const { gameId } = useParams()
    const [currentGame, updateGame] = useState({
        title: "",
        maker: "",
        number_of_players: 0,
        skill_level: 1,
        game_type: 0
    })

    useEffect(() => {
        getGameTypes().then(setGameTypes)
    }, [])

    useEffect(() => {
        getSingleGame(gameId).then(updateGame)
    }, [gameId])

    const changeGameState = (evt) => {
        const copy = { ...currentGame }
        copy[evt.target.id] = evt.target.value
        updateGame(copy)
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Update this Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input 
                        onChange={changeGameState}
                        required autoFocus 
                        type="text" id="title" 
                        className="form-control"
                        value = {currentGame.title} 
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
                        value = {currentGame.maker} 
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
                        type="text" id="number_of_players" 
                        className="form-control"
                        value = {currentGame.number_of_players} 
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
                        type="text" id="skill_level" 
                        className="form-control"
                        value = {currentGame.skill_level} 
                        placeholder="Enter a skill level of the game."
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="game_type">Select the Game Type:  </label>
                    <select 
                        id="game_type"
                        name="game_type"
                        className="form-control"
                        value = {currentGame.game_type}
                        onChange={changeGameState}>
                        <option className="form-drop"id={"game_type"}>Please select the Game Type...</option>
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
                        numberOfPlayers: parseInt(currentGame.number_of_players),
                        skillLevel: parseInt(currentGame.skill_level),
                        gameType: parseInt(currentGame.game_type),
                        id: currentGame.id
                    }

                    // Send POST request to your API
                    updateGameDetails(game)
                        .then(() => navigate("/games"))
                }}
                className="btn btn-primary">Update Me</button>
        </form>
    )
}