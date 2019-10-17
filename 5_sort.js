const config = require('./config_2');
// const dates = config.dates;

// const filename = ''
const filename = process.argv[2];

const fs = require('fs');
let datas = fs.readFileSync(filename, 'utf8').toString();
let ds = datas.split('\n');
let logs = [];
console.log(ds.length);
for (let i = 0 ; i < ds.length ; i ++) {
  let cols = ds[i].split('\t');
  if (cols[1] === undefined) {
    break;
  }
  
  logs.push({ id: cols[0], t: parseInt(cols[1], 10), user_id: cols[2], object_type: cols[3], camera_id: cols[4], grid_id: cols[5], objectX: cols[6], objectY: cols[7], width: cols[8], height: cols[9], size: cols[10], no: cols[11], videoX: cols[12], videoY: cols[13] });
  // console.log(cols[1]);
}
console.log(`logs len - ${logs.length}`);
logs.sort(function (a, b) {
  if (a.t<b.t) {
    // console.log('swap');
    return -1;
  } else if (a.t > b.t) {
    return 1;
  } else {
    return 0;
  }
  // return a.t < b.t ? -1 : a.t > b.t ? 1 : 0;
})
let buffer = '';
for ( let i = 0 ; i < logs.length -1 ; i ++) {
  let str = `${i+1}\t${logs[i].t}\t${logs[i].user_id}\t${logs[i].object_type}\t${logs[i].camera_id}\t${logs[i].grid_id}\t${logs[i].objectX}\t${logs[i].objectY}\t${logs[i].width}\t${logs[i].height}\t${logs[i].size}\t${logs[i].no}\t${logs[i].videoX}\t${logs[i].videoY}`;

  // let str = `${i}\t${logs[i].t}\t${logs[i].user_id}\t${logs[i].object_type}\t${logs[i].camera_id}\t${logs[i].grid_id}\t${logs[i].videoX}\t${logs[i].videoY}\t${logs[i].width}\t${logs[i].height}\t${logs[i].size}\t${logs[i].width}\t${logs[i].height}`;
  buffer += str + '\n';
}
// console.log(buffer);
fs.appendFileSync(`./${filename}_sorted.txt`, buffer);