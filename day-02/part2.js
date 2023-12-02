const fs = require('node:fs');

const readFileLines = (fileName) => {
    return fs.readFileSync(fileName).toString().split('\n').filter((line) => line.length > 0);
}

const lines = readFileLines("input.txt");

let dieValues = {
    blue: 0,
    red: 0,
    green: 0,
}

const checkDieInfo = (dieInfo) => {
    dieInfo.forEach((individualDiePull => {
        [dieNumber, dieColor] = individualDiePull
        //console.log(individualDiePull)
        if(Number(dieNumber) > dieValues[dieColor]){ 
            dieValues[dieColor] = Number(dieNumber); 
            //console.log(`Die info: ${dieNumber} ${dieColor}`)
    }
    }))
}

const checkPullInfo = (pullInfo) => {
    pullInfo.forEach((individualPull) => {
        const dieInfo = individualPull.split(",").map((dice) => dice.split(" ").filter((item) => item.length > 0))
        checkDieInfo(dieInfo)
    })
}


let fullSum = lines.map((game) => {
    const individualPulls = game.split(":")[1].split(";").map((pullInfo) => pullInfo.trim());
    checkPullInfo(individualPulls)
    //console.log(dieValues)
    let powerSet = Object.values(dieValues).reduce((a,b) => a*b, 1)
    dieValues.green = dieValues.blue = dieValues.red = 0
    return powerSet
}).reduce((a,b) => a + b, 0)

console.log(fullSum)


//Thinking: map over all games, pass the actual game info into a function that returns true or false; if true, add the id "i" to a sum var.