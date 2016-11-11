var users = require('./users.json');

function getId(input) {
  var id = users.length + 1;
  input.id = id;
}

module.exports = {
  indexUsers: function(req, res, next) {
    if (req.query.language) {
      var language = req.query.language.toLowerCase();
      var userLanArr = users.filter(function(user) {
        return user.language.toLowerCase() === language;
      });
      return res.json(userLanArr);
    }

    if (req.query.age) {
      var age = req.query.age;
      var userAgeArr = users.filter(function(user) {
        return user.age === age;
      });
      return res.json(userAgeArr);
    }

    if (req.query.city) {
      var city = req.query.city.toLowerCase();
      var userCityArr = users.filter(function(user) {
        return user.city.toLowerCase() === city;
      });
      return res.json(userCityArr);
    }

    if (req.query.state) {
      var state = req.query.state.toLowerCase();
      var userStateArr = users.filter(function(user) {
        return user.state.toLowerCase() === state;
      });
      return res.json(userStateArr);
    }

    if (req.query.gender) {
      var gender = req.query.gender.toLowerCase();
      var userGenderArr = users.filter(function(user) {
        return user.gender.toLowerCase() === gender;
      });
      return res.json(userGenderArr);
    }


    return res.json(users);
  },
  showUserPrivilege: function(req, res, next) {
    var priv = req.params.privilege;
    var userPrivArr = users.filter(function(user) {
      return user.type === priv;
    });
    res.json(userPrivArr);
  },
  showUserId: function(req, res, next) {
    var id = parseInt(req.params.id);
    var userId = users.find(function(user) {
      return user.id === id;
    });
    if (!userId) {
      res.sendStatus(404);
    } else {
      res.json(userId);
    }
  },
  createUser: function(req, res, next) {
    var newUser = req.body;
    getId(newUser);
    users.push(newUser);
    res.json(newUser);
  },
  createAdmin: function(req, res, next) {
    var newAdmin = req.body;
    getId(newAdmin);
    users.push(newAdmin);
    res.sendStatus(200);
  },
  updateLanguage: function(req, res, next) {
    var ident = parseInt(req.params.id);
    var lang = req.body.language;
    console.log('this is lang' + lang);
    var user = {};
    for (var i = 0; i < users.length; i++) {
      if (users[i].id === ident) {
        console.log(users[i].language);
        users[i].language = lang;
        console.log(users[i].language);
        user = users[i];
        return res.jsongit (users[i]);
      }
    }
    return res.sendStatus(404);
  },
  // updateFavs: function(req, res, next) {
  //   var ident = parseInt(req.params.id);
  //   var forums = req.body.add;
  //   console.log("This is forums " + forums);
  //   var user = {};
  //   if (!forums) {
  //     return res.sendStatus(404);
  //   }
  //   for (var i = 0; i < users.length; i++) {
  //     if (users[i].id === ident) {
  //       console.log("favorites is the following " + users[i].favorites);
  //       users[i].favorites = [users[i].favorites];
  //       users[i].favorites.push(forums);
  //       console.log('hi', users[i].favorites);
  //       return res.json(users[i]);
  //     }
  //   }
  //   return res.sendStatus(404);
  // },
  // destroyFavs: function(req, res, next) {
  //   var ident = parseInt(req.params.id);
  //   var fav = req.query.favorite;
  //   if(!fav) {
  //     return res.sendStatus(404);
  //   }
  //   var indy = 0;
  //   for (var i = 0; i < users.length; i++) {
  //     if (users[i].id === ident) {
  //       console.log("Destory", users[i].favorites);
  //       for (var j = 0; j < users[i].favorites.length; i++) {
  //         if (users[i].favorites[j] === fav) {
  //           users[i].favorites.splice(j, 1);
  //           indy = 1;
  //         }
  //       }
  //     }
  //   }
  //   return res.sendStatus(200);
  //
  // },
  destroyUser: function(req, res, next) {
    var id = parseInt(req.params.id);
    var indy = 0;
    for (var i = 0; i < users.length; i++) {
      if (users[i].id === id) {
        users.splice(i, 1);
        indy = 1;
        return res.sendStatus(404);
      }
    }
    return res.sendStatus(404);
  },
  updateUser: function(req, res, next) {
    var id = parseInt(req.params.id);
    for (var i = 0; i < users.length; i++) {
      if (users[i].id === id) {
        for (var key in users[i]) {
          if (req.body[key]) {
            users[i][key] = req.body[key];
          }
        }
        res.json(users[i]);
      }
    }
  }

};
