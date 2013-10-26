Ext.define 'BoyMeetsGirl.view.SignIn',
	extend: 'Ext.Container'
	xtype: 'signin'

	requires: [
		'Ext.field.Text'
		'Ext.field.Password'
	]

	config:
		fullscreen: true
		cls: 'signin'
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
					html: 'Sign in with your<br><b>Chaya Fuera</b> account'
				}]
			}, {
				xtype: 'container'
				cls: 'body'
				items: [{
					xtype: 'textfield'
					placeHolder: 'Email address'
				}, {
					xtype: 'passwordfield'
					placeHolder: 'Password'
				}]
			}, {
				xtype: 'button'
				baseCls: 'button'
				text: 'Sign in'
			}, {
				xtype: 'component'
				cls: 'footer'
				html: 'No account yet? <a href="#" class="createAccount">Create one here</a>.'
			}]
		}]
