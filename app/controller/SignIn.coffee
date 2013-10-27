Ext.define 'BoyMeetsGirl.controller.SignIn',
	extend: 'Ext.app.Controller'
	config:
		refs:
			view:
				selector: 'signin'
				xtype: 'signin'
				autoCreate: true
			signInButton: 'signin #signInButton'
		routes:
			signup: 'signup'

		control:
			signInButton:
				tap: (sender) ->
					console.log "signed in tapped"

	show: (direction = 'left') ->
		Ext.Viewport.animateActiveItem this.getView(), 
			type: 'slide'
			direction: direction

	signup: ->
		this.getApplication().getController('SignUp').show()