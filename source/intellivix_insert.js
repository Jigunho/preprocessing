const fs = require('fs');
const _ = require('lodash');
const db = require('./module/db');
let result = [];
fs.readdir('./2019.11.07', function(err, files) {
  files.forEach(v => {
    // console.log(v);
    let str = v.split('_');
    let date = str[0];
    let timezone = str[1].substring(0,2);
    let min = str[1].substring(2,4);
    let user_id = str[4];
    let camera_id = str[2];

    let d = new Date(`${date.substring(0,4)}-${date.substring(4,6)}-${date.substring(6,8)} ${timezone}:${min}:${00}`);
    let obj = [ d.getTime(),date, timezone, camera_id, user_id ]
    // console.log(obj);
    
    // console.log(`${date} \ ${timezone}: ${min},  ${camera_id}`);

    // console.log(camera_id); 
    result.push(obj);
  });
  const sql = `insert into ptz_car_logs2 (timestamp, date, timezone, camera_id, vehicle_id) values ?`
  db.bulk(sql, result);

});
