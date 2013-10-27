Ext.define 'BoyMeetsGirl.view.Home',
	extend: 'Ext.Container'
	xtype: 'home'

	config:
		fullscreen: true
		cls: 'home'
		scrollable: true
		items: [{
			xtype: 'component'
			cls: 'title-toolbar'
			html: '<b>Boy</b>Meets<b>Girl</b>'
		}, {
			xtype: 'container'
			cls: 'content'
			items: [{
				xtype: 'component'
				cls: 'stats'
			},{
				xtype: 'button'
				itemId: 'wantedButton'
				baseCls: 'button red with-icon'
				text: '<span class="icon heart"></span> <span class="label">See who wants to meet you!</span>'
			}, {
				xtype: 'button'
				itemId: 'personListButton'
				baseCls: 'button orange with-icon'
				text: '<span class="icon eye"></span> <span class="label">Find the girls in this club!</span>'
			}]
		}]
