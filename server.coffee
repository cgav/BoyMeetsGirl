# ---------------------------------------------------------
# constants
# ---------------------------------------------------------
FACEBOOK_URL = "https://www.facebook.com/"
USER_AGENT = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/30.0.1599.69 Safari/537.36"
PORT = 31337
USER = 'paris'
ACCESS_ID = 'tournament.paris'
URL = 'http://services.tribefire.com:8080/TftRestlet'

# ---------------------------------------------------------
# imports
# ---------------------------------------------------------
cheerio = require('cheerio')
http = require('http')
request = require('request')
fql = require('fql')
express = require('express')
mongoose = require('mongoose')
strftime = require('strftime')

# ---------------------------------------------------------
# globals vars
# ---------------------------------------------------------
SESSION_ID = '13102705041166251630df196a1e1c5f'
memberMap = {}
visitMap = {}

# ---------------------------------------------------------
# building server
# ---------------------------------------------------------
app = express()
app.use(express.bodyParser())
app.use(express.static(__dirname));

mongoose.connect('mongodb://localhost/boymeetsgirl')
db = mongoose.connection;

# ---------------------------------------------------------
# DB functions
# ---------------------------------------------------------
insertUser = null

db.on 'error', (err) ->
	if error?
		console.error error
		return

db.on 'open', ->

	# definition of the user model
	userSchema = mongoose.Schema
		user_id: String
		fid: String
		pages: [
			page_id: Number
			pic: String
			name: String
			categories: String
		]

	insertUser = (userData, callback) ->
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

# ---------------------------------------------------------
# Web server routes
# ---------------------------------------------------------

# -----------------------------------
# Helper functions
#

# Builds a flat dictionary of objects from a circular reference structure
buildMemberMap = (members) ->
	memberMap = {}

	_addToMemberMap = (member) ->
		_iterateVisits = (visit) ->
			if visit.member?
				_addToMemberMap visit.member

			if visit.event?.visits?
				for _visit in visit.event.visits.value
					_iterateVisits _visit

		if member?.id?
			memberMap[member.id.value] = member

		if member?.visits?
			for _visit in member.visits.value
				_iterateVisits _visit

	for member in members
		_addToMemberMap member

	memberMap

buildVisitMap = (visits) ->
	visitMap = {}

	_addToVisitMap = (visit) ->
		if visit.id?
			visitMap[visit.id.value] = visit

		if visit.member?.visits?
			for _visit in visit.member.visits.value
				_addToVisitMap _visit

		if visit.event?.visits?
			for _visit in visit.event.visits.value
				_addToVisitMap _visit

	for visit in visits
		_addToVisitMap visit

	visitMap

getAllVisits = (callback) ->
	entityType = "com.braintribe.model.club.Visit"
	url = "#{URL}/entity?accessId=#{ACCESS_ID}&entityType=#{entityType}&accessKind=query&sessionId=#{SESSION_ID}"

	request
		url: url
	, (error, response, body) ->
		visitMap = buildVisitMap(JSON.parse(body))
		callback?(visitMap)

getAllMembers = (callback) ->
	entityType = "com.braintribe.model.club.Member"
	url = "#{URL}/entity?accessId=#{ACCESS_ID}&entityType=#{entityType}&accessKind=query&sessionId=#{SESSION_ID}"

	request
		url: url 
	, (error, response, body) ->
		memberMap = buildMemberMap(JSON.parse(body))
		callback?(memberMap)

findMemberByEmail = (email) ->
	for id, member of memberMap
		return member if member.eMail == email

	return null

# -----------------------------------------------------------------------------
app.get '/', (req, res) ->
	res.sendfile('index.html')

# -----------------------------------------------------------------------------
app.get '/authenticate', (req, res) ->
	url = "#{URL}/authenticate?user=#{USER}&password=operating"

	request
		url: url 
	, (error, response, body) ->
		json = JSON.parse(body)
		SESSION_ID = json.sessionId
		res.send(json)

# -----------------------------------------------------------------------------
app.get '/signin/:email/:password', (req, res) ->
	getAllMembers (memberMap) ->
		for id, member of memberMap
			if member.eMail == req.params.email
				res.send(member)
				return

		res.send({})

# -----------------------------------------------------------------------------
app.get '/signup/:firstname/:lastname/:email/:password', (req, res) ->
	data =
		_type: "com.braintribe.model.club.Member"
		foreName: req.params.firstname
		surName: req.params.lastname
		eMail: req.params.email
		qrCode: Math.random() * 10000000
	entityType = "com.braintribe.model.club.Member"
	url = "#{URL}/entity?accessId=#{ACCESS_ID}&accessKind=create&data=#{JSON.stringify(data)}&sessionId=#{SESSION_ID}"
	
	request
		url: url 
	, (error, response, body) ->
		id = JSON.parse(body)[0]
		res.send(id)

# -----------------------------------------------------------------------------
app.get '/visits', (req, res) ->
	getAllVisits (visitMap) ->
		res.send(visitMap)

# -----------------------------------------------------------------------------
app.get '/checkin/:email/:fid', (req, res) ->
	data =
		_type: "com.braintribe.model.club.Visit"
		checkinTime:
			_type: "date"
			value: strftime('%Y.%m.%d %T') #'aa' #new Date().toString("yyyy.MM.dd HH:mm:ss")
		member:
			_type: "com.braintribe.model.club.Member"
			id: findMemberByEmail(req.params.email).id.value

	url = "#{URL}/entity?accessId=#{ACCESS_ID}&accessKind=create&data=#{JSON.stringify(data)}&sessionId=#{SESSION_ID}"

	request
		url: url
	, (error, _response, body) ->
		visitId = JSON.parse(body)[0]
		console.log "new visit id #{visitId}"

		# obtaining facebook data
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
				insertUser
					user_id: req.params.email
					fid: req.params.fid
					pages: pages
				, ->
					# returning result
					res.send(pages);

# ---------------------------------------------------------
# start server
# ---------------------------------------------------------
app.listen(PORT)
getAllVisits()
getAllMembers()