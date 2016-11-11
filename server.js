var express = require('express');
var bodyParser = require('body-parser');
var users = require('./usersCtrl.js');

var app = express();
app.use(bodyParser.json());

app.get('/api/users', users.indexUsers);
app.get('/api/users/:privilege', users.showUserPrivilege);
app.get('/api/users/:id', users.showUserId);
app.post('/api/users', users.createUser);
app.post('/api/users/admin', users.createAdmin);
app.post('/api/users/language/:id', users.updateLanguage);
// app.post('/api/users/forums/:id', users.updateFavs);
// app.delete('/api/users/forums/:id', users.destroyFavs);
app.delete('/api/users/:id', users.destroyUser);
app.put('/api/users/:id', users.updateUser);

app.listen(3000, function() {
  console.log('listening on port 3000');
});

module.exports = app;
