const fs = require('fs');
const config = require('./config');
const folder = './result/20190820_after/'; // 
const outerFolder = './location/20190820_after/'
const locationName = config.location
const minLatitude = config.minLatitude;
const maxLatitude = config.maxLatitude;
const minLongitude = config.minLongitude;
const maxLongitude = config.maxLongitude;


fs.readdir(folder, function (err, files) {
  files.forEach(file => {

    let buffer = '';
    let cnt = 0;

    console.log(`file start :${file}`);
    let datas = fs.readFileSync(`${folder}${file}`, 'utf8');
    
    let ds = datas.split('\n');
    let first = ds[0].split('\t')[0];
      // 0 - timestamp 
      // 1 - date
      // 2 - device id 
      // 3 - latitude
      // 4 - longitude

  
    for (let i = 0; i < ds.length; i++) {
      let logs = ds[i].split('\t');

      if (logs[3] > minLatitude && logs[3] < maxLatitude && logs[4] > minLongitude && logs[4] < maxLongitude ) {
        cnt ++;
        buffer += ds[i]+'\n';
      }

    }
    fs.appendFileSync(`${outerFolder}/${locationName}/${first}_${cnt}.txt`, buffer);

    console.log(`file - ${file} complete`);



  });
})
