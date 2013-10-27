Ext.define 'BoyMeetsGirl.util.TribefireManager',
	extend: 'Ext.Base'
	singleton: true

	requires: [
		'Ext.util.JSONP'
	],

	_httpRequest: (url, callback) ->
		Ext.Ajax.request
			url: encodeURI(url)
			success: (response) ->
				callback?(JSON.parse(response.responseText))

	_createSession: (callback) ->
		@_httpRequest '/authenticate', callback

	initialize: (callback) ->
		# @_createSession (response) =>
		# 	console.log response.sessionId
		# 	callback?()

	signIn: (email, password, callback) ->
		@_httpRequest '/signin/#{email}/#{password}', callback

	signUp: (firstname, lastname, email, password, callback) ->
		@_httpRequest '/signup/#{firstname}/#{lastname}/#{email}/#{password}', callback

	visits: (callback) ->
		@_httpRequest '/visits', callback

	checkIn: (email, fid, callback) ->
		@_httpRequest '/checkin/#{email}/#{fid}', callback