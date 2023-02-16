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
    else if (mix[3] === 'level'){
        players[playerIndex][mix[3]] = parseInt(value);
    }
    else {
        players[playerIndex][mix[3]] = value;
    }
}

function balanceTeamsByLevels(players) {
    // Shuffle the players array
    players = shuffle(players);
  
    // Sort the players by skill level in descending order
    players.sort((a, b) => b.level - a.level);
  
    // Determine the number of players per team
    const numPlayersPerTeam = Math.floor(players.length / 2);
  
    // Initialize two empty teams
    const team1 = [];
    const team2 = [];
  
    // Initialize variables to keep track of the total skill of each team
    let totalSkill1 = 0;
    let totalSkill2 = 0;
  
    // Assign players to teams greedily, starting with the highest-skilled player
    for (let i = 0; i < players.length; i++) {
      const player = players[i];
      if (i % 2 === 0 && team1.length < numPlayersPerTeam) {
        team1.push(player);
        totalSkill1 += player.level;
      } else if (team2.length < numPlayersPerTeam) {
        team2.push(player);
        totalSkill2 += player.level;
      } else {
        team1.push(player);
        totalSkill1 += player.level;
      }
    }
  
    // If the total skill of the two teams is not equal, swap one player between teams
    const tolerance = 1; // You can adjust this tolerance value
    while (Math.abs(totalSkill1 - totalSkill2) > tolerance) {
      let swapped = false;
      for (let i = 0; i < team1.length; i++) {
        for (let j = 0; j < team2.length; j++) {
          const newTotalSkill1 = totalSkill1 - team1[i].level + team2[j].level;
          const newTotalSkill2 = totalSkill2 - team2[j].level + team1[i].level;
          if (Math.abs(newTotalSkill1 - newTotalSkill2) < Math.abs(totalSkill1 - totalSkill2)) {
            const temp = team1[i];
            team1[i] = team2[j];
            team2[j] = temp;
            totalSkill1 = newTotalSkill1;
            totalSkill2 = newTotalSkill2;
            swapped = true;
            break;
          }
        }
        if (swapped) {
          break;
        }
      }
    }
  
    // Return an object with both teams
    return { team1, team2 };
  }
  
  function shuffle(array) {
    // Fisher-Yates shuffle algorithm
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
    team.forEach(p =>  sum += p.level);
    return sum;
}
const generatePlayer = (player) => {
    let positionsHTML = '';
    Object.keys(player.position).forEach(p => positionsHTML += `<div class="icon label-position-${p} me-1"></div>`);
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
    let coveredPostions = new Set();
    let coveredPostionsHTML = '';
    let playersHTML = '';
    team.forEach(p => {
        playersHTML += generatePlayer(p)
        Object.keys(p.position).forEach(position => coveredPostions.add(position));
    });
    coveredPostions = [...(coveredPostions)].sort();
    coveredPostions.forEach(position => coveredPostionsHTML += `<div class="icon label-position-${position} me-1"></div>`)
    return `<div class="team col-5">
    ${playersHTML}
    <div class="mt-1 d-flex justify-content-between">
        <div class="covered-positions d-flex">
            ${coveredPostionsHTML}
        </div>
        <div class="total me-1 text-white">${totalLevels(team)}</div>
    </div>    
</div>`;
}
const vs = () => {
    return `<div class="vs col-2 text-white d-flex align-items-center justify-content-center"><img src="../lib/images/vs.png"></div>`;
}
document.addEventListener('DOMContentLoaded', function () {
    const result = document.getElementById('result_row');
    result.innerHTML = generateTeam(teams.team1) + vs() + generateTeam(teams.team2);
}, false);
