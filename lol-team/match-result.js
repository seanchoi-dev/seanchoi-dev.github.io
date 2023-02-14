const { search } = window.location;
const participantObj = JSON.parse('{"' + decodeURI(search.substring(1)).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');
console.log(participantObj);
const mixs = {};
mixs.player = {};
let playerIndex = 0;
for (const [key, value] of Object.entries(participantObj)) {
    if (!key.includes('players'));
    const mix = key.split('.');
    if (mix[2] !== playerIndex) {
        playerIndex = mix[2];
        mixs.player[playerIndex] = {};
    }

    if ('position' === mix[3]) {
        mixs.player[playerIndex].position ??= {};
        mixs.player[playerIndex].position[mix[4]] = value;
    }
    else {
        mixs.player[playerIndex][mix[3]] = value;
    }    
}
console.log(mixs.player);