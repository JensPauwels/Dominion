const mysql = require('mysql');
const connection =  mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'root',
  password : '',
  database : 'Dominion'
});

connection.connect();

const querys = {
  getUser : 'SELECT password FROM users WHERE username = ?;'
};

const getUser = (username, password,cb) => {
   connection.query(querys.getUser,[username], (err,res) => {
     if (!err && res.length > 0) {
       if (res[0].password === password) cb(true);
       else cb(false);
     }
     else cb(false);
  });
};

module.exports = {
  getUser
};
