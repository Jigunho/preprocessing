const _ = require('lodash');
const fs = require('fs');
const config = require('./config');
const date = config.date;
const folder = `./logs/${date}_after/`;
const outFolder = `./result/${date}_after/`;
const filename = `YugoNo8`
const file1 = fs.readFileSync(`./data/OBN_GPS_ANDROID_${filename}.csv`).toString().split('\n');
const file2 = fs.readFileSync(`./data/OBN_GPS_IOS_${filename}.csv`).toString().split('\n');
// console.log(file1.length);


const exportfile = (file1, type) => {
  let result = [];
  let strs = ''

  for (let i = 0; i < file1.length; i++) {
    let latitude = [];
    let longitude = [];
    let velocity = [];
    let names = [];

    let logs = file1[i].split(',');
    // device_id
    // start_date
    // start_time
    // gps_count
    // x1
    // y1
    // time1
    // speed1
    // xn 
    // yn 
    // timen
    // speedn
    let vehicle_id = logs[0];
    let timestamp = parseInt(logs[6], 10);
    let start_lon = parseInt(logs[4], 10);
    let start_lat = parseInt(logs[5], 10)
    // 첫번쨰꺼 저장
    for (let j = 0; j < 20; j++) {
      let t = timestamp + j * 3;
      // let longitude = parseInt(logs[5 + 3 * j], 10) / 360000;
      // let latitude = parseInt(logs[6 + 3 * j], 10) / 360000;

      start_lon += parseInt(logs[8 + 4 * j], 10);
      start_lat += parseInt(logs[9 + 4 * j], 10);
      let speed = parseInt(logs[10 + 4 * j], 10);

      let obj = { timestamp: t, vehicle_id, longitude: start_lon / 360000, latitude: start_lat / 360000, speed, type }
      let str = `${t}\t${vehicle_id}\t${start_lon / 360000}\t${start_lat / 360000}\t${speed}\n`;
      strs += str;

      result.push(obj);



    }

  }
  return result;

}

let ss1 = exportfile(file1, 1);
let ss2 = exportfile(file2, 0);
// ss1.concat(ss2);
// console.log(ss2);
ss1 = ss1.concat(ss2);
console.log(ss1.length);


// ss1.sort(function (a, b) {
//   return a.timestamp < b.timestamp ? -1 : a.timestamp > b.timestamp ? 1 : 0;
// })
let buffer = `timestamp\tvehicle_id\tlongitude\tlatitude\tspeed\ttype\n`;

for (let i = 0; i < ss1.length; i++) {

  let str = `${ss1[i].timestamp}\t${ss1[i].vehicle_id}\t${ss1[i].longitude}\t${ss1[i].latitude}\t${ss1[i].speed}\t${ss1[i].type}`;
  buffer += str + '\n';

}
fs.appendFileSync(`./${filename}.csv`, buffer);



//   let c = 0;
//   let fileNum = 0;
//   let buffer = '';
//   let midtime1 = new Date().getTime();
//   for (let i = 0; i < result.length; i++) {
//     let str = `${result[i].timestamp}\t${result[i].date}\t${result[i].id}\t${result[i].latitude}\t${result[i].longitude}`;
//     if (i % 50000 === 0) {
//       fs.appendFileSync(`${outFolder}/${file}_sorted.txt`, buffer);
//       buffer = '';
//     }
//     buffer += str + '\n';

//   }
//   let midtime2 = new Date().getTime();
//   console.log(`${file} - 파일 쓰기 시간 : ${midtime2 - midtime1}`);

//   var endTime = new Date().getTime();
//   console.log(`${file} - 총 수행시간 : ${endTime - startTime}`);

// }
