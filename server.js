var ACCESS_ID, FACEBOOK_URL, PORT, SESSION_ID, URL, USER, USER_AGENT, app, buildMemberMap, buildVisitMap, cheerio, db, express, filterMostRecentVisit, findMemberByEmail, fql, getAllMembers, getAllRecentVisits, getAllVisits, getFIDs, getRecentVisitByMember, http, insertUser, memberMap, moment, mongoose, recentVisits, request, visitMap;

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

moment = require('moment');

SESSION_ID = '13102705041166251630df196a1e1c5f';

memberMap = {};

visitMap = {};

recentVisits = {};

app = express();

app.use(express.bodyParser());

app.use(express["static"](__dirname));

mongoose.connect('mongodb://localhost/boymeetsgirl');

db = mongoose.connection;

insertUser = null;

getFIDs = null;

db.on('error', function(err) {
  if (typeof error !== "undefined" && error !== null) {
    console.error(error);
  }
});

db.on('open', function() {
  var User, userSchema;
  userSchema = mongoose.Schema({
    user_id: String,
    fid: String,
    pic: String,
    firstname: String,
    lastname: String,
    pages: [
      {
        page_id: Number,
        pic: String,
        name: String,
        categories: String
      }
    ]
  });
  User = mongoose.model('User', userSchema);
  getFIDs = function(ids, callback) {
    var fids;
    fids = {};
    return User.find({}, function(error, users) {
      var id, user, _i, _j, _len, _len1;
      for (_i = 0, _len = users.length; _i < _len; _i++) {
        user = users[_i];
        for (_j = 0, _len1 = ids.length; _j < _len1; _j++) {
          id = ids[_j];
          if (id === user.user_id) {
            fids[user.user_id] = user;
          }
        }
      }
      return typeof callback === "function" ? callback(fids) : void 0;
    });
  };
  return insertUser = function(userData, callback) {
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
  return getAllMembers(function(members) {
    var eMails, id, member;
    eMails = (function() {
      var _results;
      _results = [];
      for (id in members) {
        member = members[id];
        _results.push(member.eMail);
      }
      return _results;
    })();
    return getFIDs(eMails, function(users) {
      var ids, user, user_id;
      members = [];
      ids = [];
      for (user_id in users) {
        user = users[user_id];
        member = findMemberByEmail(user_id);
        ids.push(member.id.value);
      }
      console.log(ids);
      return getAllRecentVisits(ids, function(visits) {
        var visit, _memberId;
        for (_memberId in visits) {
          visit = visits[_memberId];
          member = memberMap[_memberId];
          member.checkinTime = moment(visit.checkinTime.value, 'YYYY.MM.DD HH:mm:ss').unix();
          member.facebook_object = users[member.eMail];
          member.id = member.id.value;
          members.push(member);
        }
        return typeof callback === "function" ? callback(members) : void 0;
      });
    });
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

filterMostRecentVisit = function(visits) {
  return visits[0];
};

getRecentVisitByMember = function(memberId, callback) {
  var entityType, url;
  entityType = "com.braintribe.model.club.Member";
  url = "" + URL + "/entity?accessId=" + ACCESS_ID + "&entityType=" + entityType + "&accessKind=query&queryType=byId&id=" + memberId + "&sessionId=" + SESSION_ID;
  return request({
    url: url
  }, function(error, reponse, body) {
    var member, _ref;
    member = JSON.parse(body);
    if (member != null ? (_ref = member.visits) != null ? _ref.value : void 0 : void 0) {
      return typeof callback === "function" ? callback(member.visits.value) : void 0;
    } else {
      return typeof callback === "function" ? callback(null) : void 0;
    }
  });
};

getAllRecentVisits = function(memberIds, callback) {
  var visits, _handleNextMember;
  visits = {};
  _handleNextMember = function(memberId, callback) {
    if (memberId == null) {
      if (typeof callback === "function") {
        callback(visits);
      }
      return;
    }
    return getRecentVisitByMember(memberId, function(_visits) {
      if (_visits != null) {
        visits[memberId] = filterMostRecentVisit(_visits);
      }
      return _handleNextMember(memberIds.pop(), callback);
    });
  };
  return _handleNextMember(memberIds.pop(), callback);
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
    console.log("Member signed up with ID " + id);
    return getAllMembers(function(members) {
      return res.send({
        id: id
      });
    });
  });
});

app.get('/visits', function(req, res) {
  return getAllVisits(function(visitMap) {
    return res.send(visitMap);
  });
});

app.get('/checkin/:email/:fid', function(req, res) {
  var data, member, url;
  member = findMemberByEmail(req.params.email);
  data = {
    _type: "com.braintribe.model.club.Visit",
    checkinTime: {
      _type: "date",
      value: moment().format('YYYY.MM.DD HH:mm:ss')
    },
    member: {
      _type: "com.braintribe.model.club.Member",
      id: member.id.value
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
      var $, contents, names, namesStr, pic;
      if (error != null) {
        console.error(error);
        return;
      }
      $ = cheerio.load(body);
      contents = $(".hidden_elem").contents();
      names = [];
      pic = '';
      contents.each(function(index, element) {
        var idName, link, links, profilePic, _i, _len;
        links = $(element.data).find(".profileInfoSection a[href!='#']");
        for (_i = 0, _len = links.length; _i < _len; _i++) {
          link = links[_i];
          url = $(link).attr('href');
          idName = url.substr(url.lastIndexOf('/') + 1);
          names.push("'" + idName + "'");
        }
        profilePic = $(element.data).find("img.profilePic");
        if (profilePic.length > 0) {
          return pic = $(profilePic[0]).attr('src');
        }
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
          pic: pic,
          firstname: member.foreName,
          lastname: member.surName,
          pages: pages,
          photos: parseInt(Math.random() * 100)
        }, function() {
          return res.send(pages);
        });
      });
    });
  });
});

app.listen(PORT);

getAllMembers();
