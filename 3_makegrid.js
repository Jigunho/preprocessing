const fs = require('fs');
const config = require('./config');
const date = config.date;
const folder = `./location`;
const outerFolder = `./final`;
const locationName = config.location
const minLatitude = config.minLatitude;
const maxLatitude = config.maxLatitude;
const minLongitude = config.minLongitude;
const maxLongitude = config.maxLongitude;

let difLatitude = maxLatitude - minLatitude;
let lat1 = difLatitude / config.grid;
let difLongitude = maxLongitude - minLongitude;
let long1 = difLongitude / config.grid;
let height = config.imageHeight;
let width = config.imageWidth;
fs.readdir(`${folder}/${locationName}/`, function (err, files) {
  files.forEach(file => {

    let buffer = '';

    console.log(`file start :${file}`);
    let datas = fs.readFileSync(`${folder}/${locationName}/${file}`, 'utf8');

    let rows = datas.split('\n');

    for (let i = 0; i < rows.length; i++) {
      let cols = rows[i].split('\t');
      let latitude = parseFloat(cols[3]);
      let longitude = parseFloat(cols[4]);
    
      let l1 = latitude - minLatitude;
      let l2 = longitude - minLongitude;
      let lat_num = -1;
      let long_num = -1;
    
    
    
      lat_num = Math.floor(l1 / lat1);
      long_num = Math.floor(l2 / long1);
      let videoX = Math.floor(width * l1 / difLatitude);
      let videoY = Math.floor(height * l2 / difLongitude);
    
      let ll1 = '';
      let ll2 = '';
      if (lat_num < 10) {
        ll1 = `0${lat_num}`;
      } else {
        ll1 = `${lat_num}`;
      }
      if (long_num < 10) {
        ll2 = `0${long_num}`;
      } else {
        ll2 = `${long_num}`;
      }
      // let str = `${rows[i]}\t${lat_num}-${long_num}\n`;
      // 1566172659000   20190819085739   aSLfiEHYD1PvE3nUVjJ+BOLx70zjqeNifNXi78mdO6PvubcTzly68sDdBQDkehgc   37.49891944444445   127.02715555555555   0
      let ddd = rows[i].split('\t');
      if (ddd.length < 5) {
        break;
      }
      //           id     timestamp object_id, object_type, camera_id, grid_id, objectX, object Y , width, height, size , videoX, videoY
      let str = `${i + 1}\t${ddd[0]}\t${ddd[2]}\t${1}\t${1}\t${ll1}${ll2}\t${longitude}\t${latitude}\t${width}\t${height}\t1\t${videoY}\t${videoX}\n`;
    
    
      buffer += str;
    
    }
    
    fs.appendFileSync(`${outerFolder}/${locationName}/${file}`, buffer);


  })
});
