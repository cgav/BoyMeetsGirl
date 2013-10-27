Ext.define('BoyMeetsGirl.util.TribefireManager', {
  extend: 'Ext.Base',
  singleton: true,
  requires: ['Ext.util.JSONP'],
  data: {
    userId: -1,
    userEmail: null,
    fid: -1
  },
  _httpRequest: function(url, callback) {
    return Ext.Ajax.request({
      url: encodeURI(url),
      success: function(response) {
        return typeof callback === "function" ? callback(JSON.parse(response.responseText)) : void 0;
      },
      failure: function(response) {
        return console.log("err");
      }
    });
  },
  _createSession: function(callback) {
    return this._httpRequest('/authenticate', callback);
  },
  initialize: function(callback) {
    return typeof callback === "function" ? callback() : void 0;
  },
  signIn: function(email, password, callback) {
    var _this = this;
    return this._httpRequest("/signin/" + email + "/" + password, function(member) {
      if (member.id != null) {
        _this.data.userId = member.id.value;
        _this.data.userEmail = member.eMail;
        return typeof callback === "function" ? callback(member) : void 0;
      } else {
        return typeof callback === "function" ? callback(null) : void 0;
      }
    });
  },
  signUp: function(firstname, lastname, email, password, callback) {
    var _this = this;
    return this._httpRequest("/signup/" + firstname + "/" + lastname + "/" + email + "/" + password, function(memberId) {
      console.log(memberId);
      _this.data.userId = memberId.id;
      _this.data.userEmail = email;
      return typeof callback === "function" ? callback(memberId.id) : void 0;
    });
  },
  visits: function(callback) {
    return this._httpRequest("/visits", callback);
  },
  checkIn: function(email, fid, callback) {
    return this._httpRequest("/checkin/" + email + "/" + fid, callback);
  },
  connectFacebook: function(callback) {
    var _this = this;
    return FB.login(function(response) {
      if (response.authResponse) {
        return FB.api('/me', function(response) {
          _this.data.fid = response.username;
          return _this.checkIn(_this.data.userEmail, _this.data.fid, function(_response) {
            console.log(_response);
            return typeof callback === "function" ? callback(response.username) : void 0;
          });
        });
      } else {
        return typeof callback === "function" ? callback(null) : void 0;
      }
    });
  }
});
