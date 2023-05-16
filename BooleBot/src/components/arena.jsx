import { useState, useEffect } from "react";
import BotClass from "./BotClass";
import { checkCollision, handleCollision } from "../utils/collisionLogic.jsx";

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
  const [numTilesPerSide, setNumTilesPerSide] = useState(5);
  const [isGameRunning, setIsGameRunning] = useState(false);
  const [operator, setOperator] = useState("AND");
  const [leaderboard, setLeaderboard] = useState({});

  
  //   position, direction, tile, name, colorClass, value

  const [botsArr, setBotsArr] = useState([
    new BotClass(1, 1, numTilesPerSide, "bot1", "red", 1),
    new BotClass(4, 4, numTilesPerSide, "bot2", "blue", 1),
    new BotClass(23, 2, numTilesPerSide, "bot3", "green", 1),
    new BotClass(15, 3, numTilesPerSide, "bot4", "yellow", 1)
  ]);

  const arenaStyles = {
    gridTemplateColumns: `repeat(${numTilesPerSide}, 100px)`,
    gridTemplateRows: `repeat(${numTilesPerSide}, 100px)`,
  };

  const renderArena = () => {
    const positions = Array.from(
      { length: numTilesPerSide * numTilesPerSide },
      (_, i) => i + 1
    );
    return (
      <div className="arena" style={arenaStyles}>
        {positions.map((tilePosition) => {
          const robotIndex = botsArr.findIndex(
            (bot) => bot.position === tilePosition
          );

          return renderTile(tilePosition, robotIndex);
        })}
      </div>
    );
  };

  const renderTile = (tilePosition, robotIndex) => {
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

  console.log(botsArr)
  console.log(leaderboard)

  // useEffect(()=>{
    
  //   let gameInterval;
    
  //   if(isGameRunning){
  //       gameInterval = setInterval(()=>{
  //        startBattle();
  //       },2000)
  //   }

  //   return ()=> clearInterval(gameInterval)

  // },[isGameRunning])


 

  // useEffect(()=>{

  //       const arrayofObj = botsArr.map(prev =>{
  //         const botObj = {
  //           wins: prev.wins,
  //           loses: prev.loses
  //         }
  //         return {
  //           [prev.name]:botObj
  //         }
  //       })

  //       const mergedObj =  Object.assign({}, ...arrayofObj)

  //       setLeaderboard(mergedObj)

  // },[])

  function startGame() {
    // add setInterval and removeInterval
    // refactor the score-updating logic to use setter function instead of mutating array by reference
    // add scoreboard array to keep track of total wins and loses for each bot before losing bot is removed from botsArr

    //brainstorm ideas for visually representing the collision operation so the user can more easily understand what happened 

    setIsGameRunning(true);
    startBattle()

    //make a copy of botsArr (initial scores of all robots) when the game begins
  }


  function startBattle(){
        // console.log("BOTS ARRAY BEFORE", botsArr)
        botsArr.forEach((bot) => {
          bot.calcNextMove();
          //map each old state
          //and if the name is not equal to bot.name
          //push bot that hans'nt been changed
          //and if bot.name === name changing
          //create a new object, with the same properties but new position

          if (checkCollision(botsArr)) {
            const losingObj = handleCollision(botsArr, operator);
            console.log("LOSIGN OBJ", losingObj)
            if (losingObj) {

              // console.log("BEFORE LEADER BOARD CHANGE ", leaderboard)

              setLeaderboard((prev) => {

                return {
                  ...prev,
                  [losingObj[0].name]: {
                    wins: losingObj[0].wins,
                    loses: losingObj[0].loses
                  },
                  [losingObj[1].name]: {
                    wins: losingObj[1].wins,
                    loses: losingObj[1].loses
                  }
                }

                // console.log(leaderboard)
                // const newLeaderBoard =  prev.map((bot) => {
                //   if(bot.name === losingObj[0].name){
                //     return losingObj[0]
                //   }
                //   else if(bot.name === losingObj[1].name){
                //     return losingObj[1]
                //   }
                //   else{
                //     return bot
                //   }
                // });

                // console.log("NEW LEADREBOARD", newLeaderBoard)
                // return newLeaderBoard
              });
              console.log("After LEADER BOARD CHANGE ", leaderboard)


              setBotsArr((prevBots => {
                const newBotsArr = prevBots.map( bot => {
                  if(bot.name === losingObj[0].name){
                    return losingObj[0]
                  }
                  else if(bot.name === losingObj[1].name){
                    return losingObj[1]
                  }
                  else{
                    return bot
                  }
                })

                return newBotsArr
              }))
            }
          }

          setBotsArr((prev) => {
            const newBotsArr = prev.filter((bot) => bot.loses == 0);

            return newBotsArr;
          });

          if (botsArr.length == 1) {
            setIsGameRunning(false);
          }

          //   //create a new copy of botsArray with updated property values
          //   const newBotsArr = botsArr.map((oldBot) => {
          //     if (bot.name !== oldBot.name) {
          //       console.log("BOT", oldBot, bot)
          //       return new BotClass(
          //         oldBot.position,
          //         oldBot.direction,
          //         numTilesPerSide,
          //         oldBot.name,
          //         oldBot.colorClass,
          //         oldBot.value,
          //         oldBot.wins,
          //         oldBot.loses
          //       );
          //     } else {

          //       return new BotClass(
          //         bot.position,
          //         bot.direction,
          //         numTilesPerSide,
          //         bot.name,
          //         bot.colorClass,
          //         bot.value,
          //         bot.wins,
          //         bot.loses
          //       );
          //     }
          //   });

          //   //update the state of the bots array
          //   setBotsArr(newBotsArr);
        });
        // console.log("BOTS ARRAY after", botsArr)

  }


  return (
    <div>
      {renderArena()}
      <button onClick={() => startGame()}>Start</button>
    </div>
  );
}
