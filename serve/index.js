// server.js
var express = require('express');
var path = require('path');
var serveStatic = require('serve-static');
app = express();
app.use(serveStatic(__dirname));
var port = 80;
var hostname = '0.0.0.0';

app.get('/*', (req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname, './') } );
});

app.listen(port, hostname, () => {
   console.log(`Server running at http://${hostname}:${port}/`);
 });
