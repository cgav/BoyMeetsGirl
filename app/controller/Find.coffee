Ext.define 'BoyMeetsGirl.controller.Find',
	extend: 'Ext.app.Controller'
	config:
		refs:
			view:
				selector: 'find'
				xtype: 'find'
				autoCreate: true
			backButton: 'find #backButton'
			image: 'find #image'
			description: 'find #description'
			qr: 'find #qr'

		control:
			backButton:
				tap: (sender) ->
					this.getApplication().getController('Wanted').show('right')

	show: (direction = 'left', record = null) ->
		Ext.Viewport.animateActiveItem this.getView(), 
			type: 'slide'
			direction: direction

		if record?
			this.getImage().setSrc(record.raw.pic)
			this.getDescription().setHtml("Meet <b>#{record.raw.name}</b> at the bar in the Lounge and claim your free drink.")
			this.getQr().setSrc('https://chart.googleapis.com/chart?cht=qr&chs=160x160&chl=' + record.raw.qr)
