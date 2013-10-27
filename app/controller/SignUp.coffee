Ext.define 'BoyMeetsGirl.controller.SignUp',
	extend: 'Ext.app.Controller'
	config:
		refs:
			view:
				selector: 'signup'
				xtype: 'signup'
				autoCreate: true
			signUpButton: 'signup #signUpButton'

		control:
			signUpButton:
				tap: (sender) ->
					this.getApplication().getController('FacebookConnect').show()

	show: (direction = 'left') ->
		Ext.Viewport.animateActiveItem this.getView(), 
			type: 'slide'
			direction: direction