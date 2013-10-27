Ext.define('BoyMeetsGirl.util.TribefireManager', {
  extend: 'Ext.Base',
  singleton: true,
  requires: ['Ext.util.JSONP'],
  _httpRequest: function(url, callback) {
    return Ext.Ajax.request({
      url: encodeURI(url),
      success: function(response) {
        return typeof callback === "function" ? callback(JSON.parse(response.responseText)) : void 0;
      }
    });
  },
  _createSession: function(callback) {
    return this._httpRequest('/authenticate', callback);
  },
  initialize: function(callback) {},
  signIn: function(email, password, callback) {
    return this._httpRequest('/signin/#{email}/#{password}', callback);
  },
  signUp: function(firstname, lastname, email, password, callback) {
    return this._httpRequest('/signup/#{firstname}/#{lastname}/#{email}/#{password}', callback);
  },
  visits: function(callback) {
    return this._httpRequest('/visits', callback);
  },
  checkIn: function(email, fid, callback) {
    return this._httpRequest('/checkin/#{email}/#{fid}', callback);
  }
});
