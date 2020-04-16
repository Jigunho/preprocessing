var fs = require('fs');
var net = require('net')


var data = fs.readFileSync('./result/16513214504700_abnormal_after.txt', 'utf8');
let lines = data.split('\n');
let totalSum = 0;
let totalAvg = 0 ;
let totalCnt = 0 ;
for (let i = 0; i < lines.length ; i ++) {
  let cols = lines[i].split('\t');
  // console.log(cols.length);
  if (cols.length < 30) {
    continue;
  }
  let speed = cols[9];
  let speeds = speed.split(',');
  
  let sum = 0 ; 
  let avg = 0 ;
  let count = 0;
  for (let j = 0 ; j < speeds.length ; j++) {
    if (speeds[j] === -1 || speeds[j] === Infinity) {
      continue;
    } else {
      count ++;
      sum += parseFloat(speeds[j]);
    }
  }
  if (count <= 3) {
    continue;
  }
  avg = sum / count;
  console.log(avg);
  if (avg === Infinity) {
    continue;
  }
  totalSum += avg;
  totalCnt ++;
  
  // console.log(speed);
}
console.log(`total avg - ${totalSum/totalCnt}, total cnt - ${totalCnt}`);