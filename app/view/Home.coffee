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
				baseCls: 'button red icon'
				text: '<span class="icon heart"></span> <span class="label">See who wants to meet you!</span>'
			}, {
				xtype: 'button'
				baseCls: 'button orange icon'
				text: '<span class="icon eye"></span> <span class="label">Find the girls in this club!</span>'
			}]
		}]
