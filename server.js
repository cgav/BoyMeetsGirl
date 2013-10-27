var ACCESS_ID, FACEBOOK_URL, PORT, SESSION_ID, URL, USER, USER_AGENT, app, buildMemberMap, buildVisitMap, cheerio, db, express, findMemberByEmail, fql, getAllMembers, getAllVisits, http, insertUser, memberMap, mongoose, request, strftime, visitMap;

FACEBOOK_URL = "https://www.facebook.com/";

USER_AGENT = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/30.0.1599.69 Safari/537.36";

PORT = 31337;

USER = 'paris';

ACCESS_ID = 'tournament.paris';

URL = 'http://services.tribefire.com:8080/TftRestlet';

cheerio = require('cheerio');

http = require('http');

request = require('request');

fql = require('fql');

express = require('express');

mongoose = require('mongoose');

strftime = require('strftime');

SESSION_ID = '13102705041166251630df196a1e1c5f';

memberMap = {};

visitMap = {};

app = express();

app.use(express.bodyParser());

app.use(express["static"](__dirname));

mongoose.connect('mongodb://localhost/boymeetsgirl');

db = mongoose.connection;

insertUser = null;

db.on('error', function(err) {
  if (typeof error !== "undefined" && error !== null) {
    console.error(error);
  }
});

db.on('open', function() {
  var userSchema;
  userSchema = mongoose.Schema({
    user_id: String,
    fid: String,
    pages: [
      {
        page_id: Number,
        pic: String,
        name: String,
        categories: String
      }
    ]
  });
  return insertUser = function(userData, callback) {
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

buildMemberMap = function(members) {
  var member, _addToMemberMap, _i, _len;
  memberMap = {};
  _addToMemberMap = function(member) {
    var _i, _iterateVisits, _len, _ref, _results, _visit;
    _iterateVisits = function(visit) {
      var _i, _len, _ref, _ref1, _results, _visit;
      if (visit.member != null) {
        _addToMemberMap(visit.member);
      }
      if (((_ref = visit.event) != null ? _ref.visits : void 0) != null) {
        _ref1 = visit.event.visits.value;
        _results = [];
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          _visit = _ref1[_i];
          _results.push(_iterateVisits(_visit));
        }
        return _results;
      }
    };
    if ((member != null ? member.id : void 0) != null) {
      memberMap[member.id.value] = member;
    }
    if ((member != null ? member.visits : void 0) != null) {
      _ref = member.visits.value;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        _visit = _ref[_i];
        _results.push(_iterateVisits(_visit));
      }
      return _results;
    }
  };
  for (_i = 0, _len = members.length; _i < _len; _i++) {
    member = members[_i];
    _addToMemberMap(member);
  }
  return memberMap;
};

buildVisitMap = function(visits) {
  var visit, _addToVisitMap, _i, _len;
  visitMap = {};
  _addToVisitMap = function(visit) {
    var _i, _j, _len, _len1, _ref, _ref1, _ref2, _ref3, _results, _visit;
    if (visit.id != null) {
      visitMap[visit.id.value] = visit;
    }
    if (((_ref = visit.member) != null ? _ref.visits : void 0) != null) {
      _ref1 = visit.member.visits.value;
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        _visit = _ref1[_i];
        _addToVisitMap(_visit);
      }
    }
    if (((_ref2 = visit.event) != null ? _ref2.visits : void 0) != null) {
      _ref3 = visit.event.visits.value;
      _results = [];
      for (_j = 0, _len1 = _ref3.length; _j < _len1; _j++) {
        _visit = _ref3[_j];
        _results.push(_addToVisitMap(_visit));
      }
      return _results;
    }
  };
  for (_i = 0, _len = visits.length; _i < _len; _i++) {
    visit = visits[_i];
    _addToVisitMap(visit);
  }
  return visitMap;
};

getAllVisits = function(callback) {
  var entityType, url;
  entityType = "com.braintribe.model.club.Visit";
  url = "" + URL + "/entity?accessId=" + ACCESS_ID + "&entityType=" + entityType + "&accessKind=query&sessionId=" + SESSION_ID;
  return request({
    url: url
  }, function(error, response, body) {
    visitMap = buildVisitMap(JSON.parse(body));
    return typeof callback === "function" ? callback(visitMap) : void 0;
  });
};

getAllMembers = function(callback) {
  var entityType, url;
  entityType = "com.braintribe.model.club.Member";
  url = "" + URL + "/entity?accessId=" + ACCESS_ID + "&entityType=" + entityType + "&accessKind=query&sessionId=" + SESSION_ID;
  return request({
    url: url
  }, function(error, response, body) {
    memberMap = buildMemberMap(JSON.parse(body));
    return typeof callback === "function" ? callback(memberMap) : void 0;
  });
};

findMemberByEmail = function(email) {
  var id, member;
  for (id in memberMap) {
    member = memberMap[id];
    if (member.eMail === email) {
      return member;
    }
  }
  return null;
};

app.get('/', function(req, res) {
  return res.sendfile('index.html');
});

app.get('/authenticate', function(req, res) {
  var url;
  url = "" + URL + "/authenticate?user=" + USER + "&password=operating";
  return request({
    url: url
  }, function(error, response, body) {
    var json;
    json = JSON.parse(body);
    SESSION_ID = json.sessionId;
    return res.send(json);
  });
});

app.get('/signin/:email/:password', function(req, res) {
  return getAllMembers(function(memberMap) {
    var id, member;
    for (id in memberMap) {
      member = memberMap[id];
      if (member.eMail === req.params.email) {
        res.send(member);
        return;
      }
    }
    return res.send({});
  });
});

app.get('/signup/:firstname/:lastname/:email/:password', function(req, res) {
  var data, entityType, url;
  data = {
    _type: "com.braintribe.model.club.Member",
    foreName: req.params.firstname,
    surName: req.params.lastname,
    eMail: req.params.email,
    qrCode: Math.random() * 10000000
  };
  entityType = "com.braintribe.model.club.Member";
  url = "" + URL + "/entity?accessId=" + ACCESS_ID + "&accessKind=create&data=" + (JSON.stringify(data)) + "&sessionId=" + SESSION_ID;
  return request({
    url: url
  }, function(error, response, body) {
    var id;
    id = JSON.parse(body)[0];
    return res.send(id);
  });
});

app.get('/visits', function(req, res) {
  return getAllVisits(function(visitMap) {
    return res.send(visitMap);
  });
});

app.get('/checkin/:email/:fid', function(req, res) {
  var data, url;
  data = {
    _type: "com.braintribe.model.club.Visit",
    checkinTime: {
      _type: "date",
      value: strftime('%Y.%m.%d %T')
    },
    member: {
      _type: "com.braintribe.model.club.Member",
      id: findMemberByEmail(req.params.email).id.value
    }
  };
  url = "" + URL + "/entity?accessId=" + ACCESS_ID + "&accessKind=create&data=" + (JSON.stringify(data)) + "&sessionId=" + SESSION_ID;
  return request({
    url: url
  }, function(error, _response, body) {
    var visitId;
    visitId = JSON.parse(body)[0];
    console.log("new visit id " + visitId);
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
        var idName, link, links, _i, _len, _results;
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
        return insertUser({
          user_id: req.params.email,
          fid: req.params.fid,
          pages: pages
        }, function() {
          return res.send(pages);
        });
      });
    });
  });
});

app.listen(PORT);

getAllVisits();

getAllMembers();
