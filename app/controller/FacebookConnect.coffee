Ext.define 'BoyMeetsGirl.controller.FacebookConnect',
	extend: 'Ext.app.Controller'
	config:
		refs:
			view:
				selector: 'facebookconnect'
				xtype: 'facebookconnect'
				autoCreate: true
			connectButton: 'facebookconnect #connectButton'
			errorPanel: 'facebookconnect #errorPanel'

		control:
			connectButton:
				tap: 'connectFacebook'

	show: (direction = 'left') ->
		Ext.Viewport.animateActiveItem this.getView(), 
			type: 'slide'
			direction: direction

	connectFacebook: (sender) ->
		this.getErrorPanel().setHidden(true)

		BoyMeetsGirl.util.TribefireManager.connectFacebook (fid) =>
			if fid?
				console.log "User's facebook ID is #{fid}"
				this.getApplication().getController('Home').show()
			else
				this.getErrorPanel().setHidden(false)