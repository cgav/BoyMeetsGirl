# constants
FACEBOOK_URL = "https://www.facebook.com/"
USER_AGENT = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/30.0.1599.69 Safari/537.36"
PORT = 31337

# imports
cheerio = require('cheerio')
http = require('http')
request = require('request')
fql = require('fql')
express = require('express')
mongoose = require('mongoose')

# building server
app = express()
mongoose.connect('mongodb://localhost/boymeetsgirl')
db = mongoose.connection;

# DB functions
updateUser = null

db.on 'error', (err) ->
	if error?
		console.error error
		return

db.on 'open', ->

	# definition of the user model
	userSchema = mongoose.Schema
		user_id: String
		pages: [
			page_id: Number
			pic: String
			name: String
			categories: String
		]

	updateUser = (userData, callback) ->
		User = mongoose.model 'User', userSchema

		User.findOne
			user_id: userData.user_id
		, (error, user) ->
			if error?
				console.error error
				return

			_createUser = (userData, callback) ->
				user = new User(userData)
				user.save (error, user) ->
					throw error if error?
					callback?()

			# remove user if it exists (before creating a new one with the same id)
			if user?
				user.remove (error) ->
					if error?
						console.error error
						return

					_createUser userData, callback
			else
				_createUser userData, callback

# routes
app.get '/', (req, res) ->
	res.send('Nothing there, yet')

app.get '/checkin/:fid', (req, res) ->
	request
		url: FACEBOOK_URL + req.params.fid
		headers:
			"user-agent": USER_AGENT
	, (error, _respone, body) ->
		if error?
			console.error error
			return

		# scraping likes/pages from user
		$ = cheerio.load(body);
		contents = $(".hidden_elem").contents()
		names = []

		contents.each (index, element) ->
			links = $(element.data).find(".profileInfoSection a[href!='#']")
			for link in links
				url = $(link).attr('href')
				idName = url.substr(url.lastIndexOf('/') + 1)
				names.push "'#{idName}'"

		# extracting page data via FQL
		namesStr = names.join(',')
		fql.query "SELECT page_id, pic, name, categories FROM page WHERE username IN (#{namesStr}) OR page_id IN (#{namesStr})", (error, pages) ->
			# error is triggered if no data was returned
			if error?
				res.send({})
				return

			# preprocessing content
			for page in pages
				page.categories = (category.name for category in page.categories).join('/')

			# storing object in database
			updateUser
				user_id: req.params.fid
				pages: pages
			, ->
				# returning result
				res.send(pages);

# start server
app.listen(PORT)