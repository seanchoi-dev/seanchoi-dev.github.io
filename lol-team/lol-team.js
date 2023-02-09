const getNewParticipant = (index) => {
    return `
<div id="mix_players__${index}" class="participant-div participant-div-form row">
    <div class="col-md-4">
        <div class="input-group">
            <span class="input-group-text">
                <i class="fa fa-times delete-player"></i>
            </span>
            <input type="text" id="mix_players_${index}_name" name="mix[players][${index}][name]" class="form-control input-participants" placeholder="Participant ${index+1}" value="" control-id="ControlID-5">
        </div>
    </div>
    <div class="col-md-3 positions">
        <div id="mix_players_${index}_position" class="d-flex align-items-end justify-content-center">
            <label for="position_all_${index}" id="label_position_all_${index}" class="mx-1 label-position label-position-all active"></label>
            <input name="mix[players][${index}][position]" type="checkbox" class="position-item" data-index="${index}" data-position="all" id="position_all_${index}">
            <label for="position_top_${index}" id="label_position_top_${index}" class="mx-1 label-position label-position-top"></label>
            <input name="mix[players][${index}][position]" type="checkbox" class="position-item" data-index="${index}" data-position="top" id="position_top_${index}">
            <label for="position_jungle_${index}" id="label_position_jungle_${index}" class="mx-1 label-position label-position-jungle"></label>
            <input name="mix[players][${index}][position]" type="checkbox" class="position-item" data-index="${index}" data-position="jungle" id="position_jungle_${index}">
            <label for="position_mid_${index}" id="label_position_mid_${index}" class="mx-1 label-position label-position-mid"></label>
            <input name="mix[players][${index}][position]" type="checkbox" class="position-item" data-index="${index}" data-position="mid" id="position_mid_${index}">
            <label for="position_adc_${index}" id="label_position_adc_${index}" class="mx-1 label-position label-position-adc"></label>
            <input name="mix[players][${index}][position]" type="checkbox" class="position-item" data-index="${index}" data-position="adc" id="position_adc_${index}">
            <label for="position_support_${index}" id="label_position_support_${index}" class="mx-1 label-position label-position-support"></label>
            <input name="mix[players][${index}][position]" type="checkbox" class="position-item" data-index="${index}" data-position="support" id="position_support_${index}">
        </div>
    </div>
    <div class="col-md-5 no-padding-left">
        <div id="mix_players_${index}_level" class="level-participant d-block">
            <label for="mix_players_${index}_level_1" class="required">B</label>
            <input type="radio" id="mix_players_${index}_level_1" name="mix[players][${index}][level]" required="required" value="1">
            <label for="mix_players_${index}_level_2" class="required">BS</label>
            <input type="radio" id="mix_players_${index}_level_2" name="mix[players][${index}][level]" required="required" value="2">
            <label for="mix_players_${index}_level_3" class="required">S</label>
            <input type="radio" id="mix_players_${index}_level_3" name="mix[players][${index}][level]" required="required" value="3">
            <label for="mix_players_${index}_level_4" class="required">SG</label>
            <input type="radio" id="mix_players_${index}_level_4" name="mix[players][${index}][level]" required="required" value="4">
            <label for="mix_players_${index}_level_5" class="required">G</label>
            <input type="radio" id="mix_players_${index}_level_5" name="mix[players][${index}][level]" required="required" value="5">
            <label for="mix_players_${index}_level_6" class="required">GP</label>
            <input type="radio" id="mix_players_${index}_level_6" name="mix[players][${index}][level]" required="required" value="6">
            <label for="mix_players_${index}_level_7" class="required">P</label>
            <input type="radio" id="mix_players_${index}_level_7" name="mix[players][${index}][level]" required="required" value="7">
            <label for="mix_players_${index}_level_8" class="required">PD</label>
            <input type="radio" id="mix_players_${index}_level_8" name="mix[players][${index}][level]" required="required" value="8">
            <label for="mix_players_${index}_level_9" class="required">D</label>
            <input type="radio" id="mix_players_${index}_level_9" name="mix[players][${index}][level]" required="required" value="9">
            <label for="mix_players_${index}_level_10" class="required">DM</label>
            <input type="radio" id="mix_players_${index}_level_10" name="mix[players][${index}][level]" required="required" value="10">
            <label for="mix_players_${index}_level_11" class="required">M</label>
            <input type="radio" id="mix_players_${index}_level_11" name="mix[players][${index}][level]" required="required" value="11">
            <label for="mix_players_${index}_level_12" class="required">H</label>
            <input type="radio" id="mix_players_${index}_level_12" name="mix[players][${index}][level]" required="required" value="12">
        </div>
    </div>
</div>`;
}
const addPlayer = (index) => {
    const players = document.getElementById('mix_players');
    const div = document.createElement('div');
    div.innerHTML = getNewParticipant(index);
    players.append(div);
};

const removePlayer = (index) => {
    const p = document.getElementById(`mix_players__${index}`);
    p.parentElement.remove();
}

const numOfPlayers = document.getElementById('nb-participants');
numOfPlayers.addEventListener('change', (e) => {
    const currentPlayers = document.querySelectorAll('.participant-div');
    if (currentPlayers.length < numOfPlayers.value) {
        for (let i=currentPlayers.length; i<numOfPlayers.value; i++) {
            addPlayer(i);
        }
    } else {
        
    }
})
const defaultParticipants = () => {
    const count = numOfPlayers.value || 10;
    for (let i=0; i<count; i++) {
        addPlayer(i);
    }
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


defaultParticipants();
positionEventListener();