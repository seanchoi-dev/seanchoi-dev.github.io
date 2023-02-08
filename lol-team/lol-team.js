const addPlayer = (index) => {
    const participantEl = `
    <div id="mix_players__${index}" class="participant-div participant-div-form row">
        <div class="col-md-7">
            <div class="input-group">
                <span class="input-group-text">
                    <i class="fa fa-times delete-player"></i>
                </span>
                <input type="text" id="mix_players_${index}_name" name="mix[players][1][name]" class="form-control input-participants" placeholder="Participant 2" value="" control-id="ControlID-7">
            </div>
        </div>
        <div class="col-md-5 no-padding-left">
            <div id="mix_players_${index}_level" class="level-participant d-block">
                <label for="mix_players_${index}_level_1" class="required">B</label>
                <input type="radio" id="mix_players_${index}_level_1" name="mix[players][1][level]" required="required" value="1">
                <label for="mix_players_${index}_level_2" class="required">BS</label>
                <input type="radio" id="mix_players_${index}_level_2" name="mix[players][1][level]" required="required" value="2">
                <label for="mix_players_${index}_level_3" class="required">S</label>
                <input type="radio" id="mix_players_${index}_level_3" name="mix[players][1][level]" required="required" value="3">
                <label for="mix_players_${index}_level_4" class="required">SG</label>
                <input type="radio" id="mix_players_${index}_level_4" name="mix[players][1][level]" required="required" value="4">
                <label for="mix_players_${index}_level_5" class="required">G</label>
                <input type="radio" id="mix_players_${index}_level_5" name="mix[players][1][level]" required="required" value="5">
                <label for="mix_players_${index}_level_6" class="required">GP</label>
                <input type="radio" id="mix_players_${index}_level_6" name="mix[players][1][level]" required="required" value="6">
                <label for="mix_players_${index}_level_7" class="required">P</label>
                <input type="radio" id="mix_players_${index}_level_7" name="mix[players][1][level]" required="required" value="7">
                <label for="mix_players_${index}_level_8" class="required">PD</label>
                <input type="radio" id="mix_players_${index}_level_8" name="mix[players][1][level]" required="required" value="8">
                <label for="mix_players_${index}_level_9" class="required">D</label>
                <input type="radio" id="mix_players_${index}_level_9" name="mix[players][1][level]" required="required" value="9">
                <label for="mix_players_${index}_level_10" class="required">DM</label>
                <input type="radio" id="mix_players_${index}_level_10" name="mix[players][1][level]" required="required" value="10">
                <label for="mix_players_${index}_level_11" class="required">M</label>
                <input type="radio" id="mix_players_${index}_level_11" name="mix[players][1][level]" required="required" value="11">
                <label for="mix_players_${index}_level_12" class="required">H</label>
                <input type="radio" id="mix_players_${index}_level_12" name="mix[players][1][level]" required="required" value="12">
            </div>
        </div>
    </div>`;
}