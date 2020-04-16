const _ = require('lodash');
const fs = require('fs');
const config = require('./source/config');
const db = require('./module/db');

const file = fs.readFileSync("test11.txt").toString().split('\n');
let insert = [];
main = async () => {
  for (let i = 0; i < file.length; i++) {
    let cols = file[i].split('\t');
    if (cols.length >= 3) {

      let ary = [cols[2],cols[1], cols[3]];
      insert.push(ary);
      // console.log(`${cols[1]}${cols[2]}${cols[3]}`);

    }
  }
  const sql = `insert into ptz_user_log_1122 (timestamp, camera_id, user_id) values ?`;
  await db.bulk(sql, insert);
  console.log('end');
}

main();


