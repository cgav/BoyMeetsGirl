Ext.define 'BoyMeetsGirl.controller.Profile',
	extend: 'Ext.app.Controller'
	config:
		refs:
			view:
				selector: 'profile'
				xtype: 'profile'
				autoCreate: true
			backButton: 'profile #backButton'
			image: 'profile #image'
			name: 'profile #name'
			seen: 'profile #seen'
			interests: 'profile #interests'
			photos: 'profile #photos'
			pagesList: 'profile #pagesList'


		control:
			backButton:
				tap: (sender) ->
					this.getApplication().getController('PersonList').show('right')

	show: (direction = 'left', record = null) ->
		Ext.Viewport.animateActiveItem this.getView(), 
			type: 'slide'
			direction: direction

		console.log record.raw
		console.log this.getPhotos()
		this.getImage().setSrc(record.raw.facebook_object.pic)
		this.getName().setHtml(record.raw.foreName + " " + record.raw.surName.substr(0, 1) + ".")

		seen = parseInt((new Date().getTime() / 1000 - record.raw.checkinTime) / 3600)
		this.getSeen().setHtml("seen <b>#{seen} hours</b> ago")
		this.getInterests().setHtml("<div class='icon heart-red'></div><div class='label'>" + record.raw.facebook_object.pages.length + " common<br>interests</div>")
		this.getPhotos().setHtml("<div class='icon cam-grey'></div><div class='label'>" + parseInt(Math.random() * 50) + " photos<br>online</div>")

		this.getPagesList().setData(record.raw.facebook_object.pages)