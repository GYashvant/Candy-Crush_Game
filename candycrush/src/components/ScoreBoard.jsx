import './scoreboard.css'

const ScoreBoard = ({score}) => {
    return(
        <div className='score'>
            <h2>Your score - {score}</h2>
        </div>
    )
}

export {ScoreBoard}