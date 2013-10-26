Ext.define 'BoyMeetsGirl.view.Splash',
	extend: 'Ext.Container'
	xtype: 'splash'

	config:
		fullscreen: true
		cls: 'splash'
		items: [{
			xtype: 'component'
			cls: 'logo'
		}, {
			xtype: 'panel'
			cls: 'title'
			html: '<b>Boy</b>Meets<b>Girl</b>'
		}, {
			xtype: 'container'
			docked: 'bottom'
			cls: 'footer'
			layout: 'hbox'
			items: [{
				xtype: 'component'
				cls: 'label'
				html: 'powered by '
			}, {
				xtype: 'component'
				cls: 'chaya-logo'
			}]
		}]
