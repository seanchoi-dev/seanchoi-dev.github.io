const levelMap = {
    1: 'B',
    2: 'BS',
    3: 'S',
    4: 'SG',
    5: 'G',
    6: 'GP',
    7: 'P',
    8: 'PD',
    9: 'D',
    10: 'DM',
    11: 'M',
    12: 'H'
};
const { search } = window.location;
const participantObj = JSON.parse('{"' + decodeURI(search.substring(1)).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');
let players = [];
let playerIndex = 0;
let balancedBy = '';
for (const [key, value] of Object.entries(participantObj)) {
    if (!key.includes('players')) {
        balancedBy = value;
        continue;
    }
    const mix = key.split('.');
    if (mix[2] !== playerIndex) {
        playerIndex = mix[2];
        players[playerIndex] = {};
    }

    if ('position' === mix[3]) {
        players[playerIndex].position ??= {};
        players[playerIndex].position[mix[4]] = value;
    }
    else {
        players[playerIndex][mix[3]] = value;
    }
}


function balanceTeamsByLevels(players) {
    // Shuffle the players randomly
    players = shuffle(players);

    // Split the players into two groups of equal size
    const group1 = players.slice(0, players.length / 2);
    const group2 = players.slice(players.length / 2);

    // Initialize two empty teams
    const team1 = [];
    const team2 = [];

    // Assign players to teams alternately, starting with team1
    for (let i = 0; i < group1.length; i++) {
        const player1 = group1[i];
        const player2 = group2[i];

        if (team1.reduce((sum, player) => sum + player.level, 0) + player1.level <=
            team2.reduce((sum, player) => sum + player.level, 0) + player2.level) {
        team1.push(player1);
        team2.push(player2);
        } else {
        team1.push(player2);
        team2.push(player1);
        }
    }

    // Return an object with both teams
    return { team1, team2 };
}
  
  
// Helper function to shuffle an array randomly
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const teams = balanceTeamsByLevels(players);
console.log(teams, totalLevels(teams.team1), totalLevels(teams.team2));
function totalLevels(team) {
    let sum = 0;
    team.forEach((p) => {
        sum += parseInt(p.level);
    });
    return sum;
}
const generatePlayer = (player) => {
    let positionsHTML = '';
    Object.keys(player.position).forEach((p) => positionsHTML += `<div class="icon label-position-${p} me-1"></div>`);
    return `
    <div class="player mt-3 p-2 d-flex justify-content-between bg-white">
        <div class="name py-1">${player.name}</div>
        <div class="position-level d-flex">
            <div class="position d-flex me-2">
                ${positionsHTML}
            </div>
            <div class="level bg-warning p-1 d-flex justify-content-between"><div>${levelMap[player.level]}</div><div><small>(${player.level})</small></div></div>
        </div>
    </div>`;
};
const generateTeam = (team) => {
    let playersHTML = '';
    team.forEach((p) => playersHTML += generatePlayer(p));
    return `<div class="team col-5">
    ${playersHTML}
    <div class="total text-end me-1 text-white">${totalLevels(team)}</div>
</div>`;
}
const vs = () => {
    return `<div class="vs col-2 text-white d-flex align-items-center justify-content-center"><img src="../lib/images/vs.png"></div>`;
}
document.addEventListener('DOMContentLoaded', function () {
    const result = document.getElementById('result_row');
    result.innerHTML = generateTeam(teams.team1) + vs() + generateTeam(teams.team2);
}, false);
