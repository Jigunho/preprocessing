// const config = require('./config');
// const location = config.location;
// const timezone1 = [3, 4, 5];
// const timezone2 = [9, 10, 11];
// const timezone3 = [17, 18, 19];

// const dates = ['20190819', '20190820', '20190821'];

const config = require('./config_2');
// const dates = config.dates;
const timezones = config.timezones;
// let days = dates.length;
const location = config.location;


const fs = require('fs');
const folder = './final'
let num = 0;
fs.readdir(`${folder}/${location}/`, function (err, files) {
  files.forEach(file => {

    console.log(file);
    let datas = fs.readFileSync(`${folder}/${location}/${file}`, 'utf8');
    let rows = datas.split('\n');
    for (let j = 0; j < rows.length; j++) {
      let cols = rows[j].split('\t');
      let timestamp = parseInt(cols[1]);
      let hour = new Date(timestamp).getHours();
      

      for (let k = 0; k < timezones.length; k++) {
        if (timezones[k].includes(hour)) {
          
          // cols[0] = num ++; 
          fs.appendFileSync(`${location}_time_zone${k}.txt`, `${rows[j]}\n`);
        }
      }

      // if (timezone1.includes(hour)) {
      //   fs.appendFileSync(`${location}_time_zone111.txt`, `${rows[j]}\n`);
      // }
      // else if (timezone2.includes(hour)) {
      //   fs.appendFileSync(`${location}_time_zone222.txt`, `${rows[j]}\n`);
      // }
      // else if (timezone3.includes(hour)) {
      //   fs.appendFileSync(`${location}_time_zone333.txt`, `${rows[j]}\n`);
      // }
    }
  })

  // for (let d = 0; d < subdirs.length; d++) {
  //   console.log(subdirs[d]);

  //   const files = fs.readdirSync(`${folder}${subdirs[d]}/`);
  //   for (let i = 0; i < files.length; i++) {
  //     let data = fs.readFileSync(`${folder}${subdirs[d]}/${files[i]}`).toString();
  //     let rows = data.split('\n');
  //     // console.log(rows.length);
  //     for (let j = 0 ; j < rows.length ; j ++) {
  //       let cols = rows[j].split('\t');
  //       let timestamp = parseInt(cols[1]);
  //       let hour = new Date(timestamp).getHours();

  //       if (timezone1.includes(hour)) {
  //         fs.appendFileSync(`${subdirs[d]}_zone1.txt`, `${rows[j]}\n`);
  //       }
  //       else if (timezone2.includes(hour)) {
  //         fs.appendFileSync(`${subdirs[d]}_zone2.txt`, `${rows[j]}\n`);
  //       }
  //       else if (timezone3.includes(hour)) {
  //         fs.appendFileSync(`${subdirs[d]}_zone3.txt`, `${rows[j]}\n`);
  //       }
  //     }
  //   }

  // }

});
