const { search } = window.location;
const participantObj = JSON.parse('{"' + decodeURI(search.substring(1)).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');
console.log(participantObj);
const mixs = {};
mixs.player = {};
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

const balancedByLevel = (players) => {
    arr.sort(mixs.player).reverse()
    let a = [], b = [], sumA = 0, sumB = 0, i = 0

    while (i < arr.length) {
        if (!sumA && !sumB || sumA == sumB) {
            a.push(arr[i])
            sumA += arr[i]
        } else if (sumA < sumB) {
            a.push(arr[i])
            sumA += arr[i];
        } else if (sumB < sumA) {
            b.push(arr[i])
            sumB += arr[i];
        }
        i++
    }
    console.log(`Total: ${sumA} ${sumB}`)
    return [a, b]
}
console.log(mixs.player, balancedBy);