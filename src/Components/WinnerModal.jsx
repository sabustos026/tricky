import { Square } from "./Square.jsx"

export function WinnerModal ({ winner, resetGame }) {
  if (winner === null) return null
  //Texto informativo que  indica si Empató o Ganó
  const winnerText = (winner === false) ? 'Empate' : 'Ganó:'
  
  return(
      <section className='winner'>
      <div className='text'>
        <h2>{winnerText}</h2>

        <header className='win'>
          {winner && <Square>{winner}</Square>}
        </header>

        <footer>
          <button onClick={resetGame}>Reiniciar juego</button>
        </footer>
      </div>
    </section> 
  )
}
