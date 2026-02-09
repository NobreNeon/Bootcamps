import players from "./players.js";

function race(players) {

    message('Starting the race with these players:');

    players.forEach(player => {
        message(`${player.name} - Speed: ${player.speed}, Power: ${player.power}, Drive: ${player.drive}`);
    });

    for (let turn = 1; turn <= 5; turn++) {
        message(`\nTurn ${turn}`);

        const selectedTrack = track();
        message(`Selected track: ${selectedTrack}`);

        const diceResult1 = dice();
        const diceResult2 = dice();

        let resultLuck1 = 0;
        let resultLuck2 = 0;

        if (selectedTrack === "straight") {
            resultLuck1 = diceResult1 + players[0].speed;
            resultLuck2 = diceResult2 + players[1].speed;
            message(`${players[0].name}  rolls ${diceResult1} + Speed ${players[0].speed} = ${resultLuck1}`);
            message(`${players[1].name} rolls ${diceResult2} + Speed ${players[1].speed} = ${resultLuck2}`);

        } else if (selectedTrack === "curve") {
            resultLuck1 = diceResult1 + players[0].drive;
            resultLuck2 = diceResult2 + players[1].drive;
            message(`${players[0].name} rolls ${diceResult1} + Drive ${players[0].drive} = ${resultLuck1}`);
            message(`${players[1].name} rolls ${diceResult2} + Drive ${players[1].drive} = ${resultLuck2}`);

        } else if (selectedTrack === "confrontation") {
            resultLuck1 = diceResult1 + players[0].power;
            resultLuck2 = diceResult2 + players[1].power;
            message(`${players[0].name} rolls ${diceResult1} + Power ${players[0].power} = ${resultLuck1}`);
            message(`${players[1].name} rolls ${diceResult2} + Power ${players[1].power} = ${resultLuck2}`);
        }

        const { p1, p2 } = points(resultLuck1, resultLuck2);

        players[0].score = Math.max(0, players[0].score + p1);
        players[1].score = Math.max(0, players[1].score + p2);


        message(`Current Score: ${players[0].name}: ${players[0].score}, ${players[1].name}: ${players[1].score}`);
    }

}

function track() {
    let randomTrack = Math.random();
    let result;

    switch (true) {
        case randomTrack < 0.33:
            result = "straight";
            break;
        case randomTrack < 0.66:
            result = "curve";
            break;
        default:
            result = "confrontation";
            break;
    }
    return result;
}

function points(resultLuck1, resultLuck2) {
    let p1 = 0;
    let p2 = 0;

    if (resultLuck1 > resultLuck2) {
        p1 = 1;
        p2 = -1;
        message(`${players[0].name} wins this turn!`);
    } else if (resultLuck2 > resultLuck1) {
        p2 = 1;
        p1 = -1;
        message(`${players[1].name} wins this turn!`);
    } else {
        message("It's a tie!");
    }

    return { p1, p2 };
}

function message(message) {
    console.log(message);
}

function dice() {
    return Math.floor(Math.random() * 6) + 1;
}

function finish(players) {
    if (players[0].score > players[1].score) {
        message(`${players[0].name} wins the race with ${players[0].score} points!`);
    } else if (players[1].score > players[0].score) {
        message(`${players[1].name} wins the race with ${players[1].score} points!`);
    } else {
        message("It's a tie!");
    }
}

function main() {
    message('Welcome ao MKRS!');
    race(players);
    finish(players);
}

main();