const fs = require('fs');
const _ = require('lodash');
const file = fs.readFileSync('face_result_20days.txt','utf8');
let datas = file.split('\n');
let result = [];
for (let i = 0 ; i < datas.length; i ++) {
  
  let cols = datas[i].split('\t');
  if (cols.length < 5) {
    continue;
  }
  const sql = `insert into ptz_user_log (timestamp, camera_id, user_id) values (${cols[2]}, '${cols[1]}' , '${cols[3]}');\n`;
  fs.appendFileSync('ptz_insert.txt', sql);
  // result.push(obj);
}
