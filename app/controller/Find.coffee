Ext.define 'BoyMeetsGirl.controller.Find',
	extend: 'Ext.app.Controller'
	config:
		refs:
			view:
				selector: 'find'
				xtype: 'find'
				autoCreate: true
			backButton: 'find #backButton'

		control:
			backButton:
				tap: (sender) ->
					this.getApplication().getController('Wanted').show('right')

	show: (direction = 'left') ->
		Ext.Viewport.animateActiveItem this.getView(), 
			type: 'slide'
			direction: direction