import {useState, useEffect} from 'react'

export default function Arena(props) {
  const [isValidPosition, setIsValidPosition] = useState(false);
  const [initialPosition, setInitialPosition] = useState([]);
  const [totalTileNum, setTotalTileNum] = useState(null);
  const [numTilesPerSide, setNumTilesPerSide] = useState(3);
  const [isGameRunning, setIsGameRunning] = useState(false);
  const [operator, setOperator] = useState("AND");
  const [botsArr, setBotsArr] = useState([
    {
      name: "bot1",
      position: "5",
      direction: "1",
      value: "0",
      color: "red",
    },
    {
      name: "bot2",
      position: "6",
      direction: "3",
      value: "1",
      color: "blue",
    },
  ]);


    const arenaStyles = {
        gridTemplateColumns: `repeat(${numTilesPerSide}, 100px)`,
        gridTemplateRows: `repeat(${numTilesPerSide}, 100px)`,
    };

  const renderArena = ()=>{

    const positions = Array.from({ length: numTilesPerSide * numTilesPerSide }, (_, i)=> i +1);
    return (
        <div className="arena" style={arenaStyles}>
          {
            positions.map(tilePosition => {
                
                const robotIndex = botsArr.findIndex(bot => bot.position === tilePosition.toString())
                
                return renderTile(tilePosition, robotIndex);
            })}
        </div>
      );}


  const renderTile = (tilePosition, robotIndex ) => {
    
    const robot = robotIndex >= 0 ? botsArr[robotIndex] : null;
    const tileClass = robot ? `${robot.name} ${robot.color}` : "";
    
    return (
      <div
        key={tilePosition + 1}
        data-position={tilePosition + 1}
        className={`tile ${tileClass}`}
      >
        {tilePosition}
      </div>
    );
  };

  function startGame() {
    console.log("Game starts now!");
    setIsGameRunning(true);
  }

  return (
    <div>
      {renderArena()}
      <button onClick={() => startGame()}>Start</button>
    </div>
  );
}
