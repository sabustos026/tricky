import { useState } from 'react'
import confetti from 'canvas-confetti'
//import './App.css'
//Importamos componentes
import {Square } from './Components/Square.jsx'
import { TURNS } from './constants.js'
import { WinnerModal } from './Components/WinnerModal.jsx'

// Importar la lógica
import { checkWinnerFrom, checkEndGame } from './logic/board.js'
import { saveGameToStorage, resetGameStorage } from './logic/storage/index.js'



function App() {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    if (boardFromStorage) return JSON.parse(boardFromStorage)
    return Array(9).fill(null)
  })

  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.X
  })

  // null es que no hay ganador, false es que hay un empate
  const [winner, setWinner] = useState(null)

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

    resetGameStorage()
  }

  const updateBoard = (index) => {
    // no actualizamos esta posición
    // si ya tiene algo
    if (board[index] || winner) return
    // actualizar el tablero
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    // cambiar el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    // guardar aqui partida
    saveGameToStorage({
      board: newBoard,
      turn: newTurn
    })
    // revisar si hay ganador
    const newWinner = checkWinnerFrom(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false) // empate
    }
  }


  return (
    <div>
      {/* Contiene el elemneto principal puede ser:
          - <div></div>
          - <main></main>
      */}
      <main className='board'>
      <h1>Tricky D: </h1>

      {/* Botón para reiciar el juego */}
      <button onClick={resetGame}>Reset del juego</button>

      {/* Componete cuadricula de juego */}
      <section className='game'>
        {
          board.map((square, index) => {
            return (
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
                {square}
              </Square>
            )
          })
        }
      </section>

      {/* Componeneteque indica el truno */}
      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>

      {/* al modal se le pasa un estado y un evento */}
      <WinnerModal resetGame={resetGame} winner={winner} />
      </main>
    </div>
  )
}

export default App
