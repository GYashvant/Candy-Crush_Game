
import './App.css'
import { Game } from './components/Game';


const App = () => {
    return (
      <>
      <h1 className="name">Candy Crush</h1>
      <div className="candy-game">
        <Game />
      </div>
      </>
    )
}

export default App;
