Ext.define 'BoyMeetsGirl.controller.Home',
	extend: 'Ext.app.Controller'
	config:
		refs:
			view:
				selector: 'home'
				xtype: 'home'
				autoCreate: true
			wantedButton: 'home #wantedButton'
			personListButton: 'home #personListButton'

		control:
			wantedButton:
				tap: (sender) ->
					this.getApplication().getController('Wanted').show()

			personListButton: 
				tap: (sender) ->
					this.getApplication().getController('PersonList').show()

	show: (direction = 'left') ->
		Ext.Viewport.animateActiveItem this.getView(), 
			type: 'slide'
			direction: direction