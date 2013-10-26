Ext.define 'BoyMeetsGirl.view.SignUp',
	extend: 'Ext.Container'
	xtype: 'signup'

	requires: [
		'Ext.field.Text'
		'Ext.field.Password'
	]

	config:
		fullscreen: true
		cls: 'signup'
		scrollable: true
		items: [{
			xtype: 'component'
			cls: 'title-toolbar'
			html: '<b>Boy</b>Meets<b>Girl</b>'
		}, {
			xtype: 'container'
			cls: 'content'
			items: [{
				xtype: 'container'
				cls: 'header'
				layout:
					type: 'hbox'
					pack: 'left'
					align: 'center'
				items: [{
					xtype: 'component'
					cls: 'logo'
				}, {
					xtype: 'component'
					cls: 'description'
					html: 'Create a new<br><b>Chaya Fuera</b> account'
				}]
			}, {
				xtype: 'container'
				cls: 'body'
				items: [{
					xtype: 'textfield'
					placeHolder: 'Firstname'
				}, {
					xtype: 'textfield'
					placeHolder: 'Lastname'
				}, {
					xtype: 'textfield'
					placeHolder: 'Email address'
				}, {
					xtype: 'passwordfield'
					placeHolder: 'Password'
				}]
			}, {
				xtype: 'button'
				baseCls: 'button'
				text: 'Sign up'
			}]
		}]
