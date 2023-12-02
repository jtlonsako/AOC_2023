const fs = require('node:fs');

const readFileLines = (fileName) => {
    return fs.readFileSync(fileName).toString().split('\n').filter((line) => line.length > 0);
}

const lines = readFileLines("input.txt");

const maxDieValues = {
    blue: 14,
    red: 12,
    green: 13,
}

const checkDieInfo = (dieInfo) => {
    let results = dieInfo.map((individualDiePull => {
        [dieNumber, dieColor] = individualDiePull
        if(dieNumber > maxDieValues[dieColor]) return `over`
        else return `under`
    }))

    return results
}

const checkPullInfo = (pullInfo) => {
    let neverExceeds = true;

    pullInfo.forEach((individualPull) => {
        const dieInfo = individualPull.split(",").map((dice) => dice.split(" ").filter((item) => item.length > 0))
        let diceData = checkDieInfo(dieInfo)
        if(diceData.includes("over")) neverExceeds = false
    })


    return neverExceeds
}

let validGameCounter = 0

let idCollection = lines.map((game, i) => {
    const individualPulls = game.split(":")[1].split(";").map((pullInfo) => pullInfo.trim());
    let validGame = checkPullInfo(individualPulls)
    if(validGame) return i + 1
}).filter((id) => id).reduce((a,b) => a + b, 0);

console.log(idCollection)

//Thinking: map over all games, pass the actual game info into a function that returns true or false; if true, add the id "i" to a sum var.