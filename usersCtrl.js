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
      var age = parseInt(req.query.age);
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
    var id = req.params.privilege, flag = false;

    if (isNaN(id)) {
      var userPrivArr = users.filter(function(user) {
        return user.type === id;
      });
      // flag = true;
      return res.json(userPrivArr);
    } else {
      id = parseInt(id);
      users.map(function(e, i) {
        if (e.id === id) {
          flag = true;
          res.json(e);
        }
      });
    }

    if (!flag) {
      console.log(flag);
      console.log(id + ' does not exist');
      res.sendStatus(404);
    }
  }, //Possible that doing id and privilege in two functions will cause problems, since there is no way for the api to tell whether the param is a privilege or an id.

  // showUserId: function(req, res, next) {
  //   var id = parseInt(req.params.id);
  //   var userId = users.find(function(user) {
  //     return user.id === id;
  //   });
  //   if (!userId) {
  //     res.sendStatus(404);
  //   } else {
  //     res.json(userId);
  //   }
  // },

  createUser: function(req, res, next) {
    var f = [req.body.favorites];

    var newUser = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      gender: req.body.gender,
      language: req.body.language,
      age: req.body.age,
      city: req.body.city,
      state: req.body.state,
      type: req.params.type,
      favorites: f
    };
    getId(newUser);

    users.push(newUser);
    res.json(newUser);
  },

  createAdmin: function(req, res, next) {
    var f = [req.body.favorites];

    var newUser = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      gender: req.body.gender,
      language: req.body.language,
      age: req.body.age,
      city: req.body.city,
      state: req.body.state,
      type: req.params.type,
      favorites: f
    };
    getId(newUser);

    users.push(newUser);
    res.json(newUser);
  },

  updateLanguage: function(req, res, next) {
    var ident = parseInt(req.params.id);
    var lang = req.body.language, flag = false;
    console.log('this is lang' + lang);
    var user = {};
    users.map(function(e, i) {
      if (e.id === ident) {
        e.language = lang;
        flag = true;
        res.json(e);
      }
    });
    // for (var i = 0; i < users.length; i++) {
    //   if (users[i].id === ident) {
    //     console.log(users[i].language);
    //     users[i].language = lang;
    //     console.log(users[i].language);
    //     user = users[i];
    //     return res.jsongit (users[i]);
    //   }
    // }
    if (!flag) {
      return res.sendStatus(404);
    }
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
  updateFavs: function(req, res, next) {
    console.log(req.body.add + ' is the new fav');
    var id = parseInt(req.params.id);
    var newForum = req.body.add;
    users.map(function(e, i) {
      if (e.id === id) {
        e.favorites.push(newForum);
        res.sendStatus(200);
        console.log(e);
      }
    });
  },
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
  destroyFavs: function(req, res, next) {
    var killMe = req.query.favorite;
    var id = parseInt(req.params.id);
    users.map(function(e, i) {
      if (e.id === id) {
        //Splice here works as a nested for loop.
        e.favorites.splice(e.favorites.indexOf(killMe), 1);
        res.json(e.favorites);
      }
    });
  },
  destroyUser: function(req, res, next) {
    var id = parseInt(req.params.id);
    // var indy = 0;
    // for (var i = 0; i < users.length; i++) {
    //   if (users[i].id === id) {
    //     users.splice(i, 1);
    //     indy = 1;
    //     return res.sendStatus(404);
    //   }
    // }
    // return res.sendStatus(404);
    users.map(function(e, i) {
      if (e.id === id) {
        users.splice(i, 1);
        res.sendStatus(200);
      }
    });
  },
  updateUser: function(req, res, next) {
    var id = parseInt(req.params.id);
    // for (var i = 0; i < users.length; i++) {
    //   if (users[i].id === id) {
    //     for (var key in users[i]) {
    //       if (req.body[key]) {
    //         users[i][key] = req.body[key];
    //       }
    //     }
    //     res.json(users[i]);
    //   }
    // }
    users.map(function(e, i) {
      if(e.id === id) {
        for(var key in req.body){
          e[key] = req.body[key];
        }
        res.json(e);
      }
    });
  }

};
