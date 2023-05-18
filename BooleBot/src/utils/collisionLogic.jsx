import BotClass from "../components/BotClass"

const checkCollision = (botsArr) =>{
    // check over the current location of each robot
    //if two robots have the same location number
        //then collision occurred
        //write logic for collision
    const locationArr = botsArr.map(bot => bot.position)

    console.log("Location array", locationArr)
    
    for (let i = 0; i < locationArr.length; i++){
        for (let j = i + 1; j < locationArr.length; j++){
            if(locationArr[i] === locationArr[j]){
                return true // if any two numbers are the same, return 
            }
        }
    }
    return false
}

const updateScore = (result, botOne, botTwo) => {
    if(result){
        // botOne.wins = botOne.wins + 1
        // botTwo.loses = botTwo.loses + 1

        const botOneClone = new BotClass(
            botOne.position,
            botOne.direction,
            botOne.tile,
            botOne.name,
            botOne.colorClass,
            botOne.value,
            botOne.wins + 1,
            botOne.loses
        );

        const botTwoClone = new BotClass(
            botTwo.position,
            botTwo.direction,
            botTwo.tile,
            botTwo.name,
            botTwo.colorClass,
            botTwo.value,
            botTwo.wins,
            botTwo.loses + 1
        );
        
        return [botOneClone, botTwoClone]
    }
    else{
        console.log("It's a a tie!")
        return 
    }
}

const handleCollision = (botsArr, operator, currBotName) => {
    console.log('COLLISION!!!!!!!!!!')

    const positionMap = new Map()

    botsArr.forEach( bot => {
        if( positionMap.has(bot.position) ){
            positionMap.set(bot.position, positionMap.get(bot.position) + 1)
        }
        else{
            positionMap.set(bot.position, 1)
        }
    } )
    
    console.log("MAP ", positionMap)
    
    //will hold the positions that contain more than 1 bot
    let colidedPosition 

    //will hold an array of bots that have collided
    const colidedBots = ['','']
    
    //only get the positions where there is more than 1 bots
    for (const [key, value] of positionMap.entries()) {
        if(value > 1){
            colidedPosition = key
            break
        }
    }
    
    console.log("CurrBotNAme ", currBotName)

    //find all bots with matching collision position
    for(let i = 0; i < botsArr.length; i++){
        if(botsArr[i].position == colidedPosition){
            console.log("CurrBotNAme ", currBotName, "BotBeing looked at", botsArr[i].name)

            if(currBotName === botsArr[i].name){
                colidedBots[0] = botsArr[i]
            }else{
                colidedBots[1] = botsArr[i]
            }
            
        }
    }

    console.log("THESE ARE THE BOTS THAT SHOULD BATTLE ", colidedBots)

    // determine winer & loser
    // using AND 

    switch(operator){
        case "AND":
            const AND_Result = colidedBots[0].value && colidedBots[1].value
            return updateScore(AND_Result, colidedBots[0], colidedBots[1]);
            
            // refactor the score-updating logic to use setter function instead of mutating array by reference
            break
        case "OR":
            const OR_Result = colidedBots[0].value || colidedBots[1].value
            return updateScore(OR_Result, colidedBots[0], colidedBots[1]);
            break
        case "XOR":
            const XOR_Result = colidedBots[0].value ^ colidedBots[1].value
            return updateScore(XOR_Result, colidedBots[0], colidedBots[1]);
            break
        case "NOR":
            const NOR_Result = !(colidedBots[0].value || colidedBots[1].value)
            return updateScore(NOR_Result, colidedBots[0], colidedBots[1])
            break
    }
}


export { checkCollision, handleCollision };