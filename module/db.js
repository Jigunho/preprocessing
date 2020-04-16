const mysql = require('mysql');
const config = require('./config');
const mainConnections = mysql.createPool(config.db);

exports.getQueryResult = sql => new Promise((resolve, reject) => {
  //console.log(sql);
  mainConnections.getConnection((err1, connection) => {
    if (err1) return reject(err1);
    return connection.query(sql, (err2, rows) => {
      connection.release();
      if (err2) return reject(err2);
      return resolve(rows);
    });
  });
});

exports.bulk = (sql, values) => new Promise((resolve, reject) => {
  mainConnections.getConnection((err1, connection) => {
    if (err1) return reject(err1);
    return connection.query(sql, [values], (err2, rows) => {
      connection.release();
      if (err2) return reject(err2);
      return resolve(rows);
    });
  });
});

// const ojConnections = mysql.createPool(config.ojdb);
//
// exports.ojQuery = sql => new Promise((resolve, reject) => {
//   ojConnections.getConnection((err1, connection) => {
//     if (err1) return reject(err1);
//     return connection.query(sql, (err2, rows) => {
//       connection.release();
//       if (err2) return reject(err2);
//       return resolve(rows);
//     });
//   });
// });
