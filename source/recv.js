var fs = require('fs');
var net = require('net')
const args = process.argv;

var ip_address = args[2]
var port = args[3]
var data_per_second = args[4]

const serverPort = 32131;
let input = [];

var server = net.createServer(function (client) {

  console.log('Client connection: ');
  // console.log('   local = %s:%s', client.localAddress, client.localPort);
  // console.log('   remote = %s:%s', client.remoteAddress, client.remotePort);

  client.setTimeout(500);
  client.setEncoding('utf8');

  client.on('data', function (data) {

    // objID | type | cameraID | timestamp | grid_list | size_avg | size_std | whratio_avg | whratio_std | 
    // speed_avg | speed_std | direction | color_appear | color_disappear | width_avg | width_std | height_avg | height_std | vector_x | vector_y | area_list 
    const dd = data.toString().split('\n');
    for (let i = 0 ; i < dd.length ; i++) {
      input.push(dd[i]);
    }
  });

  client.on('end', function () {
    console.log('Client disconnected');
  });

  client.on('error', function (err) {
    console.log('Socket Error: ', JSON.stringify(err));
  });

  client.on('timeout', function () {
    console.log('Socket Timed out');
  });
});

server.listen(8080, function () {
  console.log('Server listening: ' + JSON.stringify(server.address()));
  server.on('close', function () {
    console.log('Server Terminated');
  });
  server.on('error', function (err) {
    console.log('Server Error: ', JSON.stringify(err));
  });
});

function randomIntFromInterval(min, max) // min and max included
{
  return Math.floor(Math.random() * (max - min + 1) + min);
}
function remove_duplicates_es6(arr) {
  let s = new Set(arr);
  let it = s.values();
  return Array.from(it);
}
function send_by_vehicle_id(vehicle_id) {
  //console.log(vehicle_id)
  if (typeof vehicle_id == "undefined")
    return
  strs = []
  strs.push(vehicle_obj[vehicle_id]['timestamp']) // timestamp
  strs.push(vehicle_obj[vehicle_id]['location_id']) // sensor_id 현대에서는 location_id
  strs.push(remove_duplicates_es6(vehicle_obj[vehicle_id]['grid_list']).join(","))
  str = strs.join('\t');
  console.log(str);
  connection.write(str + "\n");
  delete vehicle_obj[vehicle_id];

}
vehicle_obj = {}
try {
  //   var data = fs.readFileSync('mergerd_tag2.txt', 'utf8');
  //  var d = data.toString().split("\n")
  //  console.log(d.length);    
  try {
    var connection = net.createConnection(port, ip_address);
    console.log("connection complete!")
    var s_index = 0;

    setInterval(function () // 모아둔 애들을 보냄
    {
      if (s_index > d.length - 1)
        s_index = 0

      var t = input[s_index].split("\t")

      if (!vehicle_obj[t[2]]) { // 처음들어오는 차량 id 일경우
        vehicle_obj[t[2]] = { "grid_list": [], "timestamp": t[0], "location_id": 0 }
        setTimeout(function () { send_by_vehicle_id(t[2]) }, 10000) // 5초 동안 데이터 모아서 보냄
      }
      vehicle_obj[t[2]]['grid_list'].push(t[6])
      //console.log(d[s_index])
      s_index++;
    }, 1000 / data_per_second);

  }
  catch (e) { console.log(e) }

}
catch (e) {
  console.log('Error:', e.stack);
}