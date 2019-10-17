const fs = require('fs');
const config = require('./config');
const folder = './ddd/timezone3/';
const _ = require('lodash');

let logs = [];
fs.readdir(folder, function (err, files) {
  files.forEach(file => {

    

    console.log(`file start :${file}`);
    let datas = fs.readFileSync(`${folder}${file}`, 'utf8').toString();
    let ds = datas.split('\n');
    console.log(ds.length);
    for (let i = 0 ; i < ds.length ; i ++) {
      let cols = ds[i].split('\t');
      logs.push({ id: cols[0], t: cols[1], user_id: cols[2], object_type: cols[3], camera_id: cols[4], grid_id: cols[5], objectX: cols[6], objectY: cols[7], width: cols[8], height: cols[9], size: cols[10], videoX: cols[11], videoY: cols[12] });
    }
    
  });

  console.log(`file total len - ${logs.length}`);
  logs.sort(function (a, b) {
    return a.t < b.t ? -1 : a.t > b.t ? 1 : 0;
  })
  let buffer = '';
  for ( let i = 0 ; i < logs.length -1 ; i ++) {

    let str = `${i}\t${logs[i].t}\t${logs[i].user_id}\t${logs[i].object_type}\t${logs[i].camera_id}\t${logs[i].grid_id}\t${logs[i].videoX}\t${logs[i].videoY}\t${logs[i].width}\t${logs[i].height}\t${logs[i].size}\t${logs[i].width}\t${logs[i].height}`;
    // let str = logs[i].join('\t');
    buffer += str + '\n';
  }
  // console.log(buffer);
  fs.appendFileSync('./result3.txt', buffer);

});
