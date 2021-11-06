import { useEffect, useState } from "react";
import './game.css'
import {ScoreBoard}  from './ScoreBoard'
import blueCandy from '../Images/blue-candy.png'
import greenCandy from '../Images/green-candy.png'
import orangeCandy from '../Images/orange-candy.png'
import purpleCandy from '../Images/purple-candy.png'
import redCandy from '../Images/red-candy.png'
import yellowCandy from '../Images/yellow-candy.png'
import blank from '../Images/blank.png'


const width = 8;
const candyColors = [
  blueCandy,
  greenCandy,
  orangeCandy,
  purpleCandy,
  redCandy,
  yellowCandy
]

const Game = () =>{
    const [currentColor, setCurrentColor] = useState([]) 
    const [squareDrag, setSquareDrag] = useState(null)
    const [squareReplace, setSquareReplace] = useState(null)
    const [scoreDisplay, setScoreDisplay] = useState(0)
  
    const checkForColumnOfFour = () =>{
      for(let i=0; i<=39; i++){
        const columnOfFour = [i, i+width, i+width*2, i+width*3]
        const decideColor = currentColor[i]
        const isBlank = currentColor[i]===blank
  
        if(columnOfFour.every(square=>currentColor[square]===decideColor && !isBlank)){
          setScoreDisplay((score)=> score+4)
            columnOfFour.forEach(square=>currentColor[square] = blank)
            return true;
        }
      }
    }
  
    const checkForRowOfFour = () =>{
      for(let i=0; i<64; i++){
        const RowOfFour = [i, i+1, i+2, i+3]
        const decideColor = currentColor[i]
        const notValid = [5,6,7,13,14,15,22,23,29,30,31,37,38,39,45,46,47,53,54,55,62,63,64]
        const isBlank = currentColor[i]===blank
  
        if(notValid.includes(i)){
          continue;
        }
  
        if(RowOfFour.every(square=>currentColor[square]===decideColor && !isBlank)){
          setScoreDisplay((score)=> score+4)
            RowOfFour.forEach(square=>currentColor[square] = blank)
            return true;
        }
      }
    }
  
    const checkForColumnOfThree = () =>{
      for(let i=0; i<=47; i++){
        const columnOfThree = [i, i+width, i+width*2]
        const decideColor = currentColor[i]
        const isBlank = currentColor[i]===blank
  
        if(columnOfThree.every(square=>currentColor[square]===decideColor && !isBlank)){
          setScoreDisplay((score)=> score+3)
            columnOfThree.forEach(square=>currentColor[square] = blank)
            return true;
        }
      }
    }
  
    const checkForRowOfThree = () =>{
      for(let i=0; i<64; i++){
        const RowOfThree = [i, i+1, i+2]
        const decideColor = currentColor[i]
        const notValid = [6,7,14,15,22,23,30,31,38,39,46,47,54,55,63,64]
        const isBlank = currentColor[i]===blank
  
        if(notValid.includes(i)){
          continue;
        }
  
        if(RowOfThree.every(square=>currentColor[square]===decideColor && !isBlank)){
          setScoreDisplay((score)=> score+3)
            RowOfThree.forEach(square=>currentColor[square] = blank)
            return true;
        }
      }
    }
  
  
    const moveIntoSquareBelow=()=>{
      for(let i=0; i<55; i++){
        const firstRow = [0,1,2,3,4,5,6,7]
        const isFirstRow = firstRow.includes(i)
  
        if(isFirstRow && currentColor[i]===blank){
         let randomNumber = Math.floor(Math.random() * candyColors.length)
          currentColor[i] = candyColors[randomNumber]
        }
  
        if((currentColor[i+width])===blank){
          currentColor[i+width] = currentColor[i]
          currentColor[i]=blank
        }
      }
    }
    
    const dragStart =(e)=>{
      setSquareDrag(e.target)
    }
  
    const dragDrop =(e)=>{
      setSquareReplace(e.target)
    }
  
    const dragEnd =()=>{
   
      const dragId =  parseInt(squareDrag.getAttribute('data-id'))
      const replaceId =  parseInt(squareReplace.getAttribute('data-id'))
  
      currentColor[replaceId] = squareDrag.getAttribute('src')
      currentColor[dragId] = squareReplace.getAttribute('src')
  
  
      const validMoves = [
        squareDrag - 1,
        dragId - width,
        dragId + 1,
        dragId + width
      ]
  
      const validMove = validMoves.includes(replaceId)
  
     const columnFour =  checkForColumnOfFour()
     const rowFour = checkForRowOfFour()
     const columnThree = checkForColumnOfThree()
     const rowThree = checkForRowOfThree()
  
     if(replaceId && validMove && (columnFour || rowFour || columnThree || rowThree)){
       setSquareDrag(null)
       setSquareReplace(null)
     }else{
      currentColor[replaceId] = squareReplace.getAttribute('src')
      currentColor[dragId] = squareDrag.getAttribute('src')
      setCurrentColor([...currentColor])
     }
    }
  
    const create_board = ()=>{
      const randomColorArray = []
      for(let i=0; i<width*width; i++){
        const randomColor = candyColors[Math.floor(Math.random() * candyColors.length)]
        randomColorArray.push(randomColor)
      }
      setCurrentColor(randomColorArray);
    }
  
    useEffect(()=>{
      create_board()
    },[])
    
    useEffect(()=>{
     const timer = setInterval(()=>{
        checkForColumnOfFour()
        checkForRowOfFour()
        checkForColumnOfThree()
        checkForRowOfThree()
        moveIntoSquareBelow()
        setCurrentColor([...currentColor])
      },100)
      return () => clearInterval(timer)
    },[checkForColumnOfFour, checkForRowOfFour, checkForColumnOfThree, checkForRowOfThree, moveIntoSquareBelow, currentColor])
  
  
    return (
      <div className="App">
        <div className="game">
          {currentColor.map((candyColors, index)=>(
            <img 
            key={index}
            src= {candyColors}
            alt={candyColors}
            data-id={index}
            draggable={true}
            onDragStart={dragStart}
            onDragOver={(e)=>e.preventDefault()}
            onDragEnter={(e)=>e.preventDefault()}
            onDragLeave={(e)=>e.preventDefault()}
            onDrop={dragDrop}
            onDragEnd={dragEnd}
            />
          ))}
        </div>
        <ScoreBoard score={scoreDisplay}/>
      </div>
    );
}

export {Game}