var FACEBOOK_URL, PORT, USER_AGENT, app, cheerio, db, express, fql, http, mongoose, request, updateUser;

FACEBOOK_URL = "https://www.facebook.com/";

USER_AGENT = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/30.0.1599.69 Safari/537.36";

PORT = 31337;

cheerio = require('cheerio');

http = require('http');

request = require('request');

fql = require('fql');

express = require('express');

mongoose = require('mongoose');

app = express();

app.use(express.bodyParser());

app.use(express["static"](__dirname));

mongoose.connect('mongodb://localhost/boymeetsgirl');

db = mongoose.connection;

updateUser = null;

db.on('error', function(err) {
  if (typeof error !== "undefined" && error !== null) {
    console.error(error);
  }
});

db.on('open', function() {
  var userSchema;
  userSchema = mongoose.Schema({
    user_id: String,
    pages: [
      {
        page_id: Number,
        pic: String,
        name: String,
        categories: String
      }
    ]
  });
  return updateUser = function(userData, callback) {
    var User;
    User = mongoose.model('User', userSchema);
    return User.findOne({
      user_id: userData.user_id
    }, function(error, user) {
      var _createUser;
      if (error != null) {
        console.error(error);
        return;
      }
      _createUser = function(userData, callback) {
        user = new User(userData);
        return user.save(function(error, user) {
          if (error != null) {
            throw error;
          }
          return typeof callback === "function" ? callback() : void 0;
        });
      };
      if (user != null) {
        return user.remove(function(error) {
          if (error != null) {
            console.error(error);
            return;
          }
          return _createUser(userData, callback);
        });
      } else {
        return _createUser(userData, callback);
      }
    });
  };
});

app.get('/', function(req, res) {
  return res.sendfile('index.html');
});

app.get('/checkin/:fid', function(req, res) {
  return request({
    url: FACEBOOK_URL + req.params.fid,
    headers: {
      "user-agent": USER_AGENT
    }
  }, function(error, _respone, body) {
    var $, contents, names, namesStr;
    if (error != null) {
      console.error(error);
      return;
    }
    $ = cheerio.load(body);
    contents = $(".hidden_elem").contents();
    names = [];
    contents.each(function(index, element) {
      var idName, link, links, url, _i, _len, _results;
      links = $(element.data).find(".profileInfoSection a[href!='#']");
      _results = [];
      for (_i = 0, _len = links.length; _i < _len; _i++) {
        link = links[_i];
        url = $(link).attr('href');
        idName = url.substr(url.lastIndexOf('/') + 1);
        _results.push(names.push("'" + idName + "'"));
      }
      return _results;
    });
    namesStr = names.join(',');
    return fql.query("SELECT page_id, pic, name, categories FROM page WHERE username IN (" + namesStr + ") OR page_id IN (" + namesStr + ")", function(error, pages) {
      var category, page, _i, _len;
      if (error != null) {
        res.send({});
        return;
      }
      for (_i = 0, _len = pages.length; _i < _len; _i++) {
        page = pages[_i];
        page.categories = ((function() {
          var _j, _len1, _ref, _results;
          _ref = page.categories;
          _results = [];
          for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
            category = _ref[_j];
            _results.push(category.name);
          }
          return _results;
        })()).join('/');
      }
      return updateUser({
        user_id: req.params.fid,
        pages: pages
      }, function() {
        return res.send(pages);
      });
    });
  });
});

app.listen(PORT);
