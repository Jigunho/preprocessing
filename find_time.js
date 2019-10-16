const timezone1 = [3, 4, 5];
const timezone2 = [9, 10, 11];
const timezone3 = [17, 18, 19];



const fs = require('fs');
const folder = './final/0821/'
fs.readdir(`${folder}`, function (err, files) {
  // subdirs.err
  let result = {};
  files.forEach(file => {
    let datas = fs.readFileSync(`${folder}${file}`, 'utf8');
    let rows = datas.split('\n');
    // console.log(rows.length);
    for (let j = 0; j < rows.length; j++) {
      let cols = rows[j].split('\t');
      let timestamp = parseInt(cols[1]);
      let hour = new Date(timestamp).getHours();

      if (timezone1.includes(hour)) {
        fs.appendFileSync(`time_zone111.txt`, `${rows[j]}\n`);
      }
      else if (timezone2.includes(hour)) {
        fs.appendFileSync(`time_zone222.txt`, `${rows[j]}\n`);
      }
      else if (timezone3.includes(hour)) {
        fs.appendFileSync(`time_zone333.txt`, `${rows[j]}\n`);
      }
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
