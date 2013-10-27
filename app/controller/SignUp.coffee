Ext.define 'BoyMeetsGirl.controller.SignUp',
	extend: 'Ext.app.Controller'
	config:
		refs:
			view:
				selector: 'signup'
				xtype: 'signup'
				autoCreate: true
			signUpButton: 'signup #signUpButton'
			firstnameText: 'signup #firstnameText'
			lastnameText: 'signup #lastnameText'
			emailText: 'signup #emailText'
			passwordText: 'signup #passwordText'

		control:
			signUpButton:
				tap: 'signup'

	show: (direction = 'left') ->
		Ext.Viewport.animateActiveItem this.getView(), 
			type: 'slide'
			direction: direction

	signup: (sender) ->
		firstname = this.getFirstnameText().getValue()
		lastname = this.getLastnameText().getValue()
		email = this.getEmailText().getValue()
		password = this.getPasswordText().getValue()

		BoyMeetsGirl.util.TribefireManager.signUp firstname, lastname, email, password, (memberId) =>
			console.log memberId
			this.getApplication().getController('FacebookConnect').show()