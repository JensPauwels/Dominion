const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();
const server = require('http').createServer(app);

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'shhh' }));
app.set('view engine', 'ejs');

server.listen(8080, () => console.log('running on 8080'));

app.get('/data', (req, res) => {
  const data = ['jos', 'rudy', 'frederiek'];
  res.json(data);
  // res.send(data);
});
