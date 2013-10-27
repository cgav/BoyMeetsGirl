Ext.define 'BoyMeetsGirl.view.FacebookConnect',
	extend: 'Ext.Container'
	xtype: 'facebookconnect'

	config:
		fullscreen: true
		cls: 'facebook-connect'
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
					pack: 'center'
					align: 'center'
				items: [{
					xtype: 'component'
					cls: 'chaya-logo'
				}, {
					xtype: 'component'
					cls: 'arrow'
				}, {
					xtype: 'component'
					cls: 'facebook-logo'
				}]
			}, {
				xtype: 'component'
				cls: 'description'
				html: 'Connect to Facebook to retrieve your interests and photos.'
			}, {
				xtype: 'panel'
				itemId: 'errorPanel'
				cls: 'error'
				html: 'Cannot connect to Facebook.'
				hidden: true
			}, {
				xtype: 'button'
				itemId: 'connectButton'
				baseCls: 'button'
				text: 'Connect to Facebook'
			}]
		}]
