const log = m => console.log(m);
class Player {
    constructor(name, position, level) {
        this.name = name;
        this.position = position;
        this.level = level;
    }    
}

const defaultLevelMap = {
    I : 0,
    B : 1,
    BS : 2,
    S : 3,
    SG : 4,
    G : 5,
    GP : 6,
    P : 7,
    PD : 8,
    D : 9,
    DM : 10,
    M : 11,
    GM : 12,
    C : 13,
};

let state = {
    players: [],
    balancedBy: 'tier',
    numOfPlayers: 10,
    levelConfig: defaultLevelMap,
};

const getNewParticipant = (index, player) => {
    let levelEls = '';
    Object.keys(state.levelConfig).forEach(k => {
        const levelValue = state.levelConfig[k];
        levelEls += `
        <label for="mix_players_${index}_level_${k}" class="required ${player.level === levelValue ? 'active' : ''}">${k}</label>
        <input type="radio" id="mix_players_${index}_level_${k}" class="level-input level-input-${k}" name="mix.players.${index}.level" required="required" value="${levelValue}" ${player.level === levelValue ? 'checked' : ''}>
        `
    });
    return `
<div id="mix_players__${index}" class="participant-div participant-div-form row">
    <div class="col-md-3">
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
    <div class="col-md-6">
        <div id="mix_players_${index}_level" class="level-participant d-block">
            ${levelEls}
        </div>
    </div>
</div>`;
}
const levelConfig = () => {
    const levelConfigEl = document.querySelector('.level-config');
    Object.keys(state.levelConfig).forEach(k => {
        const configItem = document.createElement('div');
        configItem.classList.add('d-flex', 'flex-column', 'align-items-center');
        
        const inputId = `level_config_${k}`;
        
        const label = document.createElement('label');
        label.innerHTML = k;
        label.setAttribute('for', inputId);
        
        const input = document.createElement('input');
        input.id = inputId;
        input.value = state.levelConfig[k];
        input.addEventListener('change', () => {
            state.levelConfig[k] = parseInt(input.value);
            document.querySelectorAll(`.level-input-${k}`).forEach(levelInput => levelInput.value = input.value);
            saveState();
        });

        configItem.append(label);
        configItem.append(input);
        levelConfigEl.append(configItem);
    });
};

const addPlayer = (index, player) => {
    const players = document.getElementById('mix_players');
    const div = document.createElement('div');
    const p = player || new Player('', ['all'], 5);
    div.innerHTML = getNewParticipant(index, p);
    players.append(div);
    div.querySelectorAll('.position-item').forEach(input => input.addEventListener('change', () => {
        const playerPositionEl = document.getElementById(`mix_players_${index}_position`);
        const label = document.getElementById(`label_position_${input.dataset.position}_${index}`);
        const labelAll = playerPositionEl.querySelector('label');
        const inputAll = playerPositionEl.querySelector('input');
        labelAll.classList.remove('active');
        inputAll.checked = false;
        if (input === inputAll) {
            playerPositionEl.querySelectorAll('label').forEach(l => l.classList.remove('active'));
            playerPositionEl.querySelectorAll('input').forEach(i => i.checked = false);
            inputAll.checked = true;
        }
        label.classList.toggle('active');
        saveState();
    }));
    div.querySelectorAll('.input-participants').forEach(i => i.addEventListener('change', () => saveState()));
    div.querySelectorAll('.level-input').forEach(i => {
        i.addEventListener('change', e => {
            div.querySelectorAll('.level-input').forEach(ii => {
                ii.previousElementSibling.classList.remove('active');
                if (ii.checked) {
                    ii.previousElementSibling.classList.add('active');
                }
            });
            saveState();
        });
    });
};

const removePlayer = (index) => {
    const p = document.getElementById(`mix_players__${index}`);
    p.parentElement.remove();
    state.players.splice(index, 1);
}

const numParticipantsEvent = () => {
    const participantsSelect = document.getElementById('nb-participants');
    participantsSelect.value = state.numOfPlayers || 10;
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

const saveState = () => {
    state.players = [];
    document.querySelectorAll('.participant-div').forEach(p => {
        const name = p.querySelector('.input-participants').value;
        const positions = [];
        p.querySelectorAll('.position-item:checked').forEach(i => positions.push(i.dataset.position));
        state.players.push(new Player(name, positions, parseInt(p.querySelector('.level-input:checked').value)));
    });
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
const clearAll = () => {
    document.getElementById('mix_players').innerHTML = '';
    document.querySelector('.level-config').innerHTML = '';
    document.getElementById('nb-participants').value = 10;
    state = {
        players: [],
        balancedBy: 'tier',
        numOfPlayers: 10,
        levelConfig: defaultLevelMap,
    };
    saveState();
    initTeam();
};

const initTeam = () => {
    if (window.localStorage.state) {
        state = JSON.parse(window.localStorage.state);
        if (!state.levelConfig) {
            state.levelConfig = defaultLevelMap;
        }
    }
    const players = state.players;
    if (players.length) {
        players.forEach((p, i) => addPlayer(i, p));
    } else {
        for (let i=0; i<state.numOfPlayers; i++) {
            addPlayer(i);
        }
    }
    numParticipantsEvent();
    levelConfig();
};


document.addEventListener('DOMContentLoaded', function () {
    initTeam();
}, false);

