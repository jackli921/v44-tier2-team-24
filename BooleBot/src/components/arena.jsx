import {useState, useEffect} from 'react'
import BotClass from './BotClass'
import { checkCollision, handleCollision } from '../utils/collisionLogic.jsx'

// 1. Build the game arena.
// 2. Add 1 robot to the board.
// 3. Make 1 robot move in the assigned direction on click.
// 4. Make 1 robot change to a valid direction when it hits a wall.
// 5. Make the robot move automatically.
// 6. Add more than 1 robot to the board.
// 7. Add basic collision logic.


export default function Arena(props) {
  const [isValidPosition, setIsValidPosition] = useState(false);
  const [initialPosition, setInitialPosition] = useState([]);
  const [totalTileNum, setTotalTileNum] = useState(null);
  const [numTilesPerSide, setNumTilesPerSide] = useState(2);
  const [isGameRunning, setIsGameRunning] = useState(false);
  const [operator, setOperator] = useState("NOR");

//   position, direction, tile, name, colorClass, value

  const [botsArr, setBotsArr] = useState([
    new BotClass(2, 2, numTilesPerSide, "bot1", "red", 0),
    new BotClass(3, 4, numTilesPerSide, "bot2", "blue", 0)
  ]);

    const arenaStyles = {
        gridTemplateColumns: `repeat(${numTilesPerSide}, 100px)`,
        gridTemplateRows: `repeat(${numTilesPerSide}, 100px)`,
    };

  const renderArena = ()=>{

    const positions = Array.from({ length: numTilesPerSide * numTilesPerSide }, (_, i)=> i + 1);
    return (
        <div className="arena" style={arenaStyles}>
          {
            positions.map(tilePosition => {
                
                const robotIndex = botsArr.findIndex(bot => bot.position === tilePosition)
                
                return renderTile(tilePosition, robotIndex);
            })}
        </div>
      );}


  const renderTile = (tilePosition, robotIndex ) => {
    
    const robot = robotIndex >= 0 ? botsArr[robotIndex] : null;
    const tileClass = robot ? `${robot.name} ${robot.colorClass}` : "";
    
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
    // add setInterval and removeInterval
    // refactor the score-updating logic to use setter function instead of mutating array by reference
    // add scoreboard array to keep track of total wins and loses for each bot before losing bot is remvoed from botsArr

    botsArr.forEach((bot) => {
      bot.calcNextMove();
      //map each old state
      //and if the name is not equal to bot.name
      //push bot that hans'nt been changed
      //and if bot.name === name changing
      //cretate a new object, with the same properties but new position

      if (checkCollision(botsArr)) {
        handleCollision(botsArr, operator);
      }

      //create a new copy of botsArray with updated property values
      const newBotsArr = botsArr.map((oldBot) => {
        if (bot.name !== oldBot.name) {
          return new BotClass(
            oldBot.position,
            oldBot.direction,
            numTilesPerSide,
            oldBot.name,
            oldBot.colorClass,
            oldBot.value,
            oldBot.wins,
            oldBot.loses
          );
        } else {
          return new BotClass(
            bot.position,
            bot.direction,
            numTilesPerSide,
            bot.name,
            bot.colorClass,
            bot.value,
            bot.wins,
            bot.loses
          );
        }
      });

      //update the state of the bots array
      setBotsArr(newBotsArr);
    });
  }
 console.log(botsArr);

  return (
    <div>
      {renderArena()}
      <button onClick={() => startGame()}>Start</button>
    </div>
  );
}
