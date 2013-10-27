Ext.define 'BoyMeetsGirl.controller.SignIn',
	extend: 'Ext.app.Controller'
	config:
		refs:
			view:
				selector: 'signin'
				xtype: 'signin'
				autoCreate: true
			signInButton: 'signin #signInButton'
			emailText: 'signin #emailText'
			passwordText: 'signin #passwordText'
			errorPanel: 'signin #errorPanel'

		routes:
			signup: 'signup'

		control:
			signInButton: 
				tap: 'signin'

	show: (direction = 'left') ->
		Ext.Viewport.animateActiveItem this.getView(), 
			type: 'slide'
			direction: direction

	signup: ->
		this.getApplication().getController('SignUp').show()

	signin: (sender) ->
		this.getErrorPanel().setHidden(true)

		email = this.getEmailText().getValue()
		password = this.getPasswordText().getValue()

		BoyMeetsGirl.util.TribefireManager.signIn email, password, (member) =>
			
			if member?
				BoyMeetsGirl.util.TribefireManager.connectFacebook (fid) =>
					if fid?
						console.log "User's facebook ID is #{fid}"
						this.getApplication().getController('Home').show()
					else
						console.log "Could not connect to facebook"
			else
				this.getErrorPanel().setHidden(false)
