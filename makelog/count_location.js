const fs = require('fs');
const folder = './final/'
fs.readdir(`${folder}`, function (err, subdirs) {
  // subdirs.err
  let result = {};
  for (let d = 0; d < subdirs.length; d++) {

    const files = fs.readdirSync(`${folder}${subdirs[d]}/`);
    for (let i = 0; i < files.length; i++) {
      let data = fs.readFileSync(`${folder}${subdirs[d]}/${files[i]}`).toString();
      let rows = data.split('\n');
      // console.log(rows.length);
      for (let j = 0 ; j < rows.length ; j ++) {
        let cols = rows[j].split('\t');
        let timestamp = parseInt(cols[1]);
        // console.log(timestamp);
        let hour = new Date(timestamp).getHours();
        result[hour] = result[hour] === undefined ? 0 : result[hour] += 1;
      }
    }
    let str = '';
    console.log();
    console.log(subdirs[d]);

    for (let i = 0 ; i < 24 ; i ++) {
      if (i%3===0) {
        console.log();
      }
      process.stdout.write(`${i}시 - ${result[i]}\t`);
      

    }
    // console.log(JSON.stringify(result));
  }

});
