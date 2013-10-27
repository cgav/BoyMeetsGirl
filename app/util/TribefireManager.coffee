Ext.define 'BoyMeetsGirl.util.TribefireManager',
	extend: 'Ext.Base'
	singleton: true

	requires: [
		'Ext.util.JSONP'
	]

	data:
		userId: -1
		userEmail: null
		fid: -1

	_httpRequest: (url, callback) ->
		Ext.Ajax.request
			url: encodeURI(url)
			success: (response) ->
				callback?(JSON.parse(response.responseText))
			failure: (response) ->
				console.log "err"

	_createSession: (callback) ->
		@_httpRequest '/authenticate', callback

	initialize: (callback) ->
		# @_createSession (response) =>
		# 	console.log response.sessionId
		# 	callback?()
		callback?()

	signIn: (email, password, callback) ->
		@_httpRequest "/signin/#{email}/#{password}", (member) =>
			if member.id?
				@data.userId = member.id.value
				@data.userEmail = member.eMail
				callback?(member)
			else
				callback?(null)

	signUp: (firstname, lastname, email, password, callback) ->
		@_httpRequest "/signup/#{firstname}/#{lastname}/#{email}/#{password}", (memberId) =>
			console.log memberId
			@data.userId = memberId.id
			@data.userEmail = email
			callback?(memberId.id)

	visits: (callback) ->
		@_httpRequest "/visits", callback

	checkIn: (email, fid, callback) ->
		@_httpRequest "/checkin/#{email}/#{fid}", callback

	connectFacebook: (callback) ->
		FB.login (response) =>
            if response.authResponse
            	FB.api '/me', (response) =>
            		@data.fid = response.username

            		@checkIn @data.userEmail, @data.fid, (_response) ->
            			console.log _response
            			callback?(response.username)
            else
                callback?(null)
    