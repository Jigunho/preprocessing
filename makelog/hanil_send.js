var fs = require('fs');
var net = require('net')
const args = process.argv;

var ip_address = args[2]
var port = args[3]
var data_per_second = args[4]

var id_obj = {}
var id_index = 0
let prev_time = 0;
try {
  var data = fs.readFileSync('./result/1hour/road2_normal_time_zone0.txt_sorted.txt', 'utf8');
  var d = data.toString().split("\n")
  console.log(d.length);
  try {
    var connection = net.createConnection(port, ip_address);
    console.log("connection complete!")
    var s_index = 0;
    var Interval_num = setInterval(function () {
      if (s_index > d.length - 1) {
        return;

      }
    })
  } 
  catch (e) { console.log(e) }

}
catch (e) { console.log(e) }
