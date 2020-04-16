// const dates = config.dates;

const _ = require('lodash');
// const filename = ''
const filename = process.argv[2];

const fs = require('fs');
let datas = fs.readFileSync(filename, 'utf8').toString();
let ds = datas.split('\n');
let logs = [];
console.log(ds.length);
for (let i = 0; i < ds.length; i++) {
  let cols = ds[i].split('\t');
  if (cols[1] === undefined) {
    break;
  }

  logs.push({ id: cols[0], t: parseInt(cols[1], 10), user_id: cols[2], object_type: cols[3], camera_id: cols[4], grid_id: cols[5], objectX: cols[6], objectY: cols[7], width: cols[8], height: cols[9], size: cols[10], no: cols[11], videoX: cols[12], videoY: cols[13] });
  // console.log(cols[1]);
}
let result = _.groupBy(logs, 'grid_id');
let keys = Object.keys(result);
for (let i = 0; i < keys.length; i++) {
  console.log(`${keys[i]} - ${result[keys[i]].length}`);
}
keys.sort(function (a, b) {
  if (a < b) {
    return -1;
  } else if (a > b) {
    return 1;
  } else {
    return 0;
  }
})
// console.log(JSON.stringify(keys));
// console.log(keys.length);
