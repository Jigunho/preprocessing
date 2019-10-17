const _ = require('lodash');
const fs = require('fs');
const config = require('./config');
const date = config.date;
const folder = `./logs/${date}_after/`;
const outFolder = `./result/${date}_after/`;

fs.readdir(folder, function (err, files) {
  files.forEach(file => {

    var startTime = new Date().getTime();

    let cnt = 0;
    let latitude = [];
    let longitude = [];
    let velocity = [];
    let names = [];

    console.log(`file start :${file}`);
    let datas = fs.readFileSync(`${folder}${file}`, 'utf8');
    let ds = datas.split('\n');

    let result = [];

    console.log(ds.length);
    // return;
    for (let i = 0; i < ds.length; i++) {
      let logs = ds[i].split(',');
      if (logs.length !== 366) {
        cnt++;
        continue;
      }

      // if ( i % 100 )
      // 0 - device id 
      // 1 - deviceid
      // 2 - date
      // 3 - time
      // 5 + 3n - longitude
      // 6 + 3n - latitude
      // 7 + 3n - speed 
      let final_logs = [];
      let time = logs[3];
      // console.log(`time: ${time}`);
      let hour = time.substring(0, 2);
      let min = time.substring(2, 4);

      let date = logs[2];
      let year = date.substring(0, 4);
      let month = date.substring(4, 6);
      let day = date.substring(6, 8);

      for (let j = 0; j < 20; j++) {
        let ts = `${year}-${month}-${day} ${hour}:${min}:${j * 3}`;
        let timestamp = Date.parse(ts);

        let longitude = parseInt(logs[5 + 3 * j], 10) / 360000;
        let latitude = parseInt(logs[6 + 3 * j], 10) / 360000;
        // velocity.push(parseInt(logs[7 + 3 * j], 10));
        let obj = null;
        if (j < 3) {
          obj = { id: logs[1], timestamp, date: `${date}${hour}${min}0${j * 3}`, latitude, longitude };
        } else {
          obj = { id: logs[1], timestamp, date: `${date}${hour}${min}${j * 3}`, latitude, longitude };
        }
        result.push(obj);

      }

      // if (i === 1000) {
      //   break;
      // }

    }
    console.log('complete');
    result.sort(function (a, b) {
      return a.timestamp < b.timestamp ? -1 : a.timestamp > b.timestamp ? 1 : 0;
    })


    let c = 0;
    let fileNum = 0;
    let buffer = '';
    let midtime1 = new Date().getTime();
    for (let i = 0; i < result.length; i++) {
      let str = `${result[i].timestamp}\t${result[i].date}\t${result[i].id}\t${result[i].latitude}\t${result[i].longitude}`;
      if (i % 50000 === 0) {
        fs.appendFileSync(`${outFolder}/${file}_sorted.txt`, buffer);
        buffer = '';
      }
      buffer += str + '\n';

    }
    let midtime2 = new Date().getTime();
    console.log(`${file} - 파일 쓰기 시간 : ${midtime2 - midtime1}`);

    var endTime = new Date().getTime();
    console.log(`${file} - 총 수행시간 : ${endTime - startTime}`);

  })
})
