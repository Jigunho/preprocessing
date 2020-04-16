const fs = require('fs');
const config = require('./config');
const folder = `../location`;
const outerFolder = `../final`;
const locationName = config.location
const minLatitude = config.minLatitude;
const maxLatitude = config.maxLatitude;
const minLongitude = config.minLongitude;
const maxLongitude = config.maxLongitude;

let difLatitude = maxLatitude - minLatitude;
let lat1 = difLatitude / config.grid; // grid 한칸당 크기
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
    
    
    
      lat_num = Math.ceil(l1 / lat1);
      long_num = Math.ceil(l2 / long1);
      let videoX = Math.ceil(width * l1 / difLatitude);
      let videoY = Math.ceil(height * l2 / difLongitude);
    
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


// 9	1566215478000	wNVvo7aOvqSfywa3aknawsEkgqNoM43Jr6z6JPKghq3m2MGjjrO4vVI6AJAS4dRA	1	1	0402	220	121	40	40	1	640	640
// 7	1566253290000	is8oOigmQdVHFsZk0EtMSKr/SSB2aMMdR9uQc5wdiB2v2TIxgJUB6ugpJWGY1yWl	1	1	0107	80	400	40	40	1	640	640

      // FRAME   1566204882000   21      1       16513214504700  0104    306     110     1       1       1       1       640     640
      //           id     timestamp object_id, object_type, camera_id, grid_id, objectX, object Y , width, height, size , videoX, videoY
     // let str =/ `${i + 1}\t${ddd[0]}\t${ddd[2]}\t${1}\t${1}\t${ll2}${ll1}\t${videoX}\t${videoY}\t${15}\t${15}\t1\t1\t${width}\t${height}\n`;
      let strs = [];
      strs.push('12345')
      strs.push(ddd[0]);
      strs.push(`${ll2}${ll1}`);
      strs.push('20');
      strs.push(videoX);
      strs.push(videoY);
      strs.push('15');
      strs.push('15')
      strs.push(width);
      strs.push(height)
      strs.push('\n')

    
      buffer += strs.join('\t')

    
    }
    
    fs.appendFileSync(`${outerFolder}/${locationName}/${file}`, buffer);


  })
});
