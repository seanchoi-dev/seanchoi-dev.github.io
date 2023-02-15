const { search } = window.location;
const participantObj = JSON.parse('{"' + decodeURI(search.substring(1)).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');
const players = [];

let playerIndex = 0;
let balancedBy = '';
console.log(participantObj)
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
    players[playerIndex].index = playerIndex;
}
players.sort((a, b)=>{
    return parseInt(b.level) - parseInt(a.level);
 });

const balancedByLevel = (n) => {
    const asm = players => players.reduce((a,c)=>a + parseInt(c.level), 0);
    const asm2 = arr=>arr.reduce((a,c)=>a+c,0);
    let lim = Math.ceil(asm(players)/n),
        loopend = players.length*n;
        dist=[...Array(n)].map(()=>[]);
    for (let i = 0; players.length && i < loopend; i++) {
        if (parseInt(asm2(dist[i%n])) + parseInt(players[0].level)<=lim) {
            dist[i % n].push(players.shift());
           
        }
    }
    // console.log("lim:",lim);
    if (players.length) console.log(lim,"Not all elements were distributed!")
    return dist
}


const result = balancedByLevel(2);
console.log(result);
console.log("sums:", result.map(a=>a.reduce((s,c)=>s + parseInt(c.level), 0)));


console.log(balancedBy);

var sk=[9,7,6,5,4,8,7,5,4,2],n=2;
function greedy(arr,n){
  const asm=arr=>arr.reduce((a,c)=>a+c,0);
  console.log('asm',asm(arr));
  let lim=Math.ceil(asm(arr)/n),
      loopend=sk.length*n;
      srt=arr.slice(0).sort((a,b)=>b-a),
      dist=[...Array(n)].map(()=>[]);
      console.log('srt', srt);
  for (let i=0; srt.length && i<loopend ; i++) {
    if (asm(dist[i%n])+srt[0]<=lim) {
        dist[i%n].push(srt.shift());
    }
  }
  console.log("lim:",lim);
  if (srt.length) console.log(lim,"Not all elements were distributed!")
  return dist
}

var res=greedy(sk,n);

console.log(res);
console.log("sums:",res.map(a=>a.reduce((s,c)=>s+c)));