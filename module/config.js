module.exports = {
  host: 'localhost',
  port: 8090,
  socket_port: 8021,
  appRoot: __dirname,
  db: {
    connectionLimit: 50,
    host: '165.132.145.41',
    user: 'root',
    password: 'uihi150',
    database: 'cctv_osan_vehicle',
    multipleStatements: true,
    pool: {
      max:5,
      min:0,
      idle: 20000,
      acquire: 20000
    }
  },
};
