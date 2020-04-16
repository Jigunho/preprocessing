const fs = require('fs');
const _ = require('lodash');
const file = fs.readFileSync('ptz_logs.txt','utf8');
const db = require('')
let datas = file.split('\n');
let result = [];