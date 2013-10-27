Ext.define 'BoyMeetsGirl.controller.FacebookConnect',
	extend: 'Ext.app.Controller'
	config:
		refs:
			view:
				selector: 'facebookconnect'
				xtype: 'facebookconnect'
				autoCreate: true
			connectButton: 'facebookconnect #connectButton'

		control:
			connectButton:
				tap: (sender) ->
					this.getApplication().getController('Home').show()

	show: (direction = 'left') ->
		Ext.Viewport.animateActiveItem this.getView(), 
			type: 'slide'
			direction: direction