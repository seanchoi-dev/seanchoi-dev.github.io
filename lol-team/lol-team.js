class Player {
    constructor(name, position, level) {
        this.name = name;
        this.position = position;
        this.level = level;
    }    
}
let state = {
    players: [],
    balancedBy: 'tier',
    numOfPlayers: 10,
};
const getNewParticipant = (index, player) => {
    return `
<div id="mix_players__${index}" class="participant-div participant-div-form row">
    <div class="col-md-4">
        <div class="input-group">
            <input type="text" id="mix_players_${index}_name" name="mix.players.${index}.name" class="form-control input-participants" placeholder="Player ${index+1}" value="${player.name}" required>
        </div>
    </div>
    <div class="col-md-3 positions">
        <div id="mix_players_${index}_position" class="d-flex align-items-end justify-content-center">
            <label for="position_all_${index}" id="label_position_all_${index}" class="mx-1 label-position label-position-all ${player.position.includes('all') ? 'active' : ''}"></label>
            <input name="mix.players.${index}.position.all" type="checkbox" class="position-item" data-index="${index}" data-position="all" id="position_all_${index}" ${player.position.includes('all') ? 'checked' : ''}>
            <label for="position_top_${index}" id="label_position_top_${index}" class="mx-1 label-position label-position-top ${player.position.includes('top') ? 'active' : ''}"></label>
            <input name="mix.players.${index}.position.top" type="checkbox" class="position-item" data-index="${index}" data-position="top" id="position_top_${index}" ${player.position.includes('top') ? 'checked' : ''}>
            <label for="position_jungle_${index}" id="label_position_jungle_${index}" class="mx-1 label-position label-position-jungle ${player.position.includes('jungle') ? 'active' : ''}"></label>
            <input name="mix.players.${index}.position.jungle" type="checkbox" class="position-item" data-index="${index}" data-position="jungle" id="position_jungle_${index}" ${player.position.includes('jungle') ? 'checked' : ''}>
            <label for="position_mid_${index}" id="label_position_mid_${index}" class="mx-1 label-position label-position-mid ${player.position.includes('mid') ? 'active' : ''}"></label>
            <input name="mix.players.${index}.position.mid" type="checkbox" class="position-item" data-index="${index}" data-position="mid" id="position_mid_${index}" ${player.position.includes('mid') ? 'checked' : ''}>
            <label for="position_adc_${index}" id="label_position_adc_${index}" class="mx-1 label-position label-position-adc ${player.position.includes('adc') ? 'active' : ''}"></label>
            <input name="mix.players.${index}.position.adc" type="checkbox" class="position-item" data-index="${index}" data-position="adc" id="position_adc_${index}" ${player.position.includes('adc') ? 'checked' : ''}>
            <label for="position_support_${index}" id="label_position_support_${index}" class="mx-1 label-position label-position-support ${player.position.includes('support') ? 'active' : ''}"></label>
            <input name="mix.players.${index}.position.support" type="checkbox" class="position-item" data-index="${index}" data-position="support" id="position_support_${index}" ${player.position.includes('support') ? 'checked' : ''}>
        </div>
    </div>
    <div class="col-md-5 no-padding-left">
        <div id="mix_players_${index}_level" class="level-participant d-block">
            <label for="mix_players_${index}_level_1" class="required">B</label>
            <input type="radio" id="mix_players_${index}_level_1" name="mix.players.${index}.level" required="required" value="1" class="${player.level === 1 ? 'level-hover" checked="checked' : ''}">
            <label for="mix_players_${index}_level_2" class="required">BS</label>
            <input type="radio" id="mix_players_${index}_level_2" name="mix.players.${index}.level" required="required" value="2" class="${player.level === 2 ? 'level-hover" checked="checked' : ''}">
            <label for="mix_players_${index}_level_3" class="required">S</label>
            <input type="radio" id="mix_players_${index}_level_3" name="mix.players.${index}.level" required="required" value="3" class="${player.level === 3 ? 'level-hover" checked="checked' : ''}">
            <label for="mix_players_${index}_level_4" class="required">SG</label>
            <input type="radio" id="mix_players_${index}_level_4" name="mix.players.${index}.level" required="required" value="4" class="${player.level === 4 ? 'level-hover" checked="checked' : ''}">
            <label for="mix_players_${index}_level_5" class="required">G</label>
            <input type="radio" id="mix_players_${index}_level_5" name="mix.players.${index}.level" required="required" value="5" class="${player.level === 5 ? 'level-hover" checked="checked' : ''}">
            <label for="mix_players_${index}_level_6" class="required">GP</label>
            <input type="radio" id="mix_players_${index}_level_6" name="mix.players.${index}.level" required="required" value="6" class="${player.level === 6 ? 'level-hover" checked="checked' : ''}">
            <label for="mix_players_${index}_level_7" class="required">P</label>
            <input type="radio" id="mix_players_${index}_level_7" name="mix.players.${index}.level" required="required" value="7" class="${player.level === 7 ? 'level-hover" checked="checked' : ''}">
            <label for="mix_players_${index}_level_8" class="required">PD</label>
            <input type="radio" id="mix_players_${index}_level_8" name="mix.players.${index}.level" required="required" value="8" class="${player.level === 8 ? 'level-hover" checked="checked' : ''}">
            <label for="mix_players_${index}_level_9" class="required">D</label>
            <input type="radio" id="mix_players_${index}_level_9" name="mix.players.${index}.level" required="required" value="9" class="${player.level === 9 ? 'level-hover" checked="checked' : ''}">
            <label for="mix_players_${index}_level_10" class="required">DM</label>
            <input type="radio" id="mix_players_${index}_level_10" name="mix.players.${index}.level" required="required" value="10" class="${player.level === 10 ? 'level-hover" checked="checked' : ''}">
            <label for="mix_players_${index}_level_11" class="required">M</label>
            <input type="radio" id="mix_players_${index}_level_11" name="mix.players.${index}.level" required="required" value="11" class="${player.level === 11 ? 'level-hover" checked="checked' : ''}">
            <label for="mix_players_${index}_level_12" class="required">H</label>
            <input type="radio" id="mix_players_${index}_level_12" name="mix.players.${index}.level" required="required" value="12" class="${player.level === 12 ? 'level-hover" checked="checked' : ''}">
        </div>
    </div>
</div>`;
}
const addPlayer = (index, player) => {
    const players = document.getElementById('mix_players');
    const div = document.createElement('div');
    const p = player || new Player('', ['all'], 5);
    state.players.push(p);
    div.innerHTML = getNewParticipant(index, p);
    players.append(div);
};

const removePlayer = (index) => {
    const p = document.getElementById(`mix_players__${index}`);
    p.parentElement.remove();
    state.players.splice(index, 1);
}

const initTeam = () => {
    if (!window.localStorage.state) {
        for (let i=0; i<10; i++) {
            addPlayer(i);
        }
        return;
    }

    const stateFromStorage = JSON.parse(window.localStorage.state);
    const participantsSelect = document.getElementById('nb-participants');
    participantsSelect.value = stateFromStorage.numOfPlayers;
    participantsSelect.addEventListener('change', (e) => {     
        const currentPlayers = document.querySelectorAll('.participant-div');
        if (currentPlayers.length < participantsSelect.value) {
            for (let i=currentPlayers.length; i<participantsSelect.value; i++) {
                addPlayer(i);
            }
        } else {
            for (let i=currentPlayers.length-1; i>=participantsSelect.value; i--) {
                removePlayer(i);
            }
        }
        state.numOfPlayers = participantsSelect.value;
        saveState();
    });
   
    const players = stateFromStorage.players;
    players.forEach((p, i) => addPlayer(i, p));
    setLevel('.level-participant');
};

const positionEventListener = () =>  {
    const positionInputs = document.querySelectorAll('.position-item');
    positionInputs.forEach((pi) => {
        pi.addEventListener('change', (e) => {
            const index = pi.dataset.index;
            const playerPositionEl = document.getElementById(`mix_players_${index}_position`);
            const label = document.getElementById(`label_position_${pi.dataset.position}_${index}`);
            const labelAll = playerPositionEl.querySelector('label');
            const inputAll = playerPositionEl.querySelector('input');
            labelAll.classList.remove('active');
            inputAll.checked = false;
            if (pi === inputAll) {
                playerPositionEl.querySelectorAll('label').forEach(l => l.classList.remove('active'));
                playerPositionEl.querySelectorAll('input').forEach(i => i.checked = false);
                inputAll.checked = true;
            }
            label.classList.toggle('active');
        });
    });
}

const importBtn = document.getElementById('import-p-button');
importBtn.addEventListener('click', () => {
    const pList = document.getElementById('import-participant-list').value.split(/\n/);
    let i = 0;
    pList.forEach((value) => {
        if (value) {
            document.getElementById(`mix_players_${i}_name`).value = value;
            i++;
        }        
    })
});

const updateState = () => {
    document.querySelectorAll('#mix_players input').forEach(input => input.addEventListener('change', (e) => {
        const playerIndex = input.closest('.participant-div').id.split('__')[1];
        if (input.id.includes('name')) {
            state.players[playerIndex].name = input.value;            
        } else if (input.id.includes('level')) {
            state.players[playerIndex].level = parseInt(input.value);
        } else if (input.id.includes('position')) {
            let positions = [];
            document.getElementById(`mix_players_${playerIndex}_position`)
            .querySelectorAll('input')
            .forEach(i => {
                if (i.checked) {
                    positions.push(i.dataset.position);
                }
            });
            state.players[playerIndex].position = positions;
        }
        saveState();
    }));
}

const saveState = () => {
    window.localStorage.state = JSON.stringify(state);
}

const submitted = () => {
    let isValid = true;
    const errMsg = document.querySelector('.error-msg');
    document.querySelectorAll('.input-error').forEach(i => i.classList.remove('.input-error'));
    document.querySelectorAll('.participant-div').forEach(p => {
        const name = p.querySelector('input[type=text]');
        if(!name.value) {
            name.classList.add('input-error');
            errMsg.style.display = 'block';
            isValid = false;
            return false;   
        }
    });
    if (isValid) {
        window.location = './team-match-results.html'
    };
    
    return false;
}

document.addEventListener('DOMContentLoaded', function () {
    initTeam();
    positionEventListener();
    updateState();
}, false);

