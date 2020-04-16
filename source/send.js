var fs = require('fs');
var net = require('net')
const args = process.argv;

var ip_address = args[2]
var port = args[3]
var data_per_second = args[4]

var id_obj = {}
var id_index = 0
try {
  var data = fs.readFileSync('gangnam_2_time_zone1.txt_sorted.txt', 'utf8');
  var d = data.toString().split("\n")
  console.log(d.length);
  try {
    var connection = net.createConnection(port, ip_address);
    console.log("connection complete!")
    var s_index = 0;
    var Interval_num = setInterval(function () {
      if (s_index > d.length - 1) {
        // s_index = 0;
        return;
        // id_obj = {}
      }
      let str = d[s_index];


      let strs = str.split('\t');
      if (!id_obj[strs[2]]) {
        id_index++;
        id_obj[strs[2]] = id_index
      }
      else
        id_index = id_obj[strs[2]]
      z = []
      z.push("FRAME")
      z.push(strs[1])
      z.push(id_index)
      z.push(strs[3])
      z.push("16513214504700")
      z.push(strs[5])
      z.push(strs[6])
      z.push(strs[7])
      z.push(strs[8])
      z.push(strs[9])
      z.push(strs[10])
      z.push(strs[11])
      z.push(strs[12])
      z.push(strs[13])

      str = strs.join('\t');
      zz = z.join('\t') + "\n"
      console.log(zz);
      //  fs.appendFile('log.txt', zz, function (err) {
      //   if (err) throw err;
      //   console.log('Saved!');
      // });
      connection.write(zz);
      //console.log(d[s_index])
      s_index++;
    }, 1000 / data_per_second);

  }
  catch (e) { console.log(e) }

}
catch (e) {
  console.log('Error:', e.stack);
}