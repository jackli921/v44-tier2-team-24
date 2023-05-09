import {useState, useEffect} from 'react'

export default function Arena() {
    const [arenaSize, setArenaSize] = useState(3)
    
    
   
    /*
    const generateArena = () => {
    let position = 1

    for (let j = 0; j < arenaSize * arenaSize; j++) {
            const cell = document.createElement('div')

            //will hold the position of the current tile
            cell.dataset.position = position

            //add a cell style to the new div
            cell.classList.add('cell')

            //will be uesd to label the tile with it's current position
            cell.innerText = position

            arena.appendChild(cell)
            position++
        }
}

arena.style.gridTemplateColumns = `repeat( ${tile} , 50px )`
arena.style.gridTemplateRows = `repeat( ${tile} , 50px )`

    */

function renderArena() {
    const arrayTile = []

    for(let i =0 ; i < arenaSize * arenaSize; i++){
        arrayTile.push(
            <div key={i} className='tile' data-position={i + 1} >
            </div>
        )
    }
    return arrayTile
}

const arenaStyles = {
    gridTemplateColumns: `repeat(${arenaSize}, 100px)`,
    gridTemplateRows: `repeat(${arenaSize}, 100px)`
}
  
return (
  <div className="arena" style={arenaStyles}>
    {renderArena()}
  </div>
);
}
