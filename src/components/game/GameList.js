import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { deleteGame, getGames } from "../../managers/GameManager.js"
import "./GameList.css"

export const GameList = (props) => {
    const [games, setGames] = useState([])
    const navigate = useNavigate();
    
    const updateGameList = () => {
        getGames().then(data => setGames(data))
    }

    useEffect(() => {
        updateGameList()
    }, [])
    

    return (
        <>
            <button className="btn btn-2 btn-sep icon-create"
                onClick={() => {
                    navigate({ pathname: "/games/new" })
                }}
            >Register New Game</button>
            <article className="games">
                {
                    games.map(game => {
                        return <>
                        <section key={`game--${game.id}`} className="game">
                            <Link to={`/games/edit/${game.id}`} className="game__number">Game #: {game.id}</Link>
                            <div className="game__title">{game.title} by {game.maker}</div>
                            <div className="game__players">{game.number_of_players} players needed</div>
                            <div className="game__skillLevel">Skill level is {game.skill_level}</div>
                        </section>
                        <button className="button_delete"
                            onClick={() => {
                                deleteGame(game.id).then(() => updateGameList())
                            }}>Delete this Game</button>
                        </>
                    })
                }
            </article>
        </>
    )
}

// createGame(game)
//                         .then(() => navigate("/games"))
//                 }}