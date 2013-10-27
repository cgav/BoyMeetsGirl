Ext.define 'BoyMeetsGirl.controller.Profile',
	extend: 'Ext.app.Controller'
	config:
		refs:
			view:
				selector: 'profile'
				xtype: 'profile'
				autoCreate: true
			backButton: 'profile #backButton'

		control:
			backButton:
				tap: (sender) ->
					this.getApplication().getController('PersonList').show('right')

	show: (direction = 'left') ->
		Ext.Viewport.animateActiveItem this.getView(), 
			type: 'slide'
			direction: direction