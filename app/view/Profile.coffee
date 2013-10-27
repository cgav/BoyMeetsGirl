Ext.define 'BoyMeetsGirl.view.Profile',
	extend: 'Ext.Container'
	xtype: 'profile'

	requires: [
		'Ext.List'
	]

	config:
		fullscreen: true
		cls: 'profile'
		layout: 'vbox'
		items: [{
			xtype: 'container'
			cls: 'title-toolbar'
			layout: 'hbox'
			items: [{
				xtype: 'button'
				baseCls: 'toolbar-button icon back'
			}, {
				xtype: 'component'
				flex: 1
				cls: 'label'
				html: '<b>Boy</b>Meets<b>Girl</b>'
			}]
		}, {
			xtype: 'container'
			cls: 'content'
			layout: 'vbox'
			flex: 1
			items: [{
				xtype: 'container'
				layout: 'hbox'
				cls: 'header'
				items: [{
					xtype: 'image'
					src: 'https://fbcdn-profile-a.akamaihd.net/hprofile-ak-frc3/c0.0.628.628/s320x320/1379474_10152281554223765_259450346_n.jpg'
					cls: 'profile-pic'
				}, {
					xtype: 'container'
					layout: 'vbox'
					items: [{
						xtype: 'component'
						cls: 'name'
						html: 'Julia N.'
					}, {
						xtype: 'component'
						cls: 'seen'
						html: 'seen <b>30 minutes</b> ago'
					}, {
						xtype: 'button'
						baseCls: 'button orange inline-button'
						text: 'I want to meet her'
					}]
				}]
			}, {
				xtype: 'container'
				layout: 'hbox'
				cls: 'links'
				items: [{
					xtype: 'button'
					baseCls: 'profile-button active'
					html: "
						<div class='icon heart-red'></div>
						<div class='label'>3 common<br>interests</div>
					"
				}, {
					xtype: 'button'
					baseCls: 'profile-button'
					html: "
						<div class='icon cam-grey'></div>
						<div class='label'>8 photos<br>online</div>
					"
				}]
			}, {
				xtype: 'container'
				layout: 'card'
				flex: 1
				items: [{
					xtype: 'list'
					cls: 'pages-list'
					pressedCls: 'item-tapped'
					selectedCls: 'item-tapped'
					itemTpl: "
						<div class='item'>
							<div class='pic'>
								<img src='{pic}' />
							</div>
							<div class='description'>
								<div class='name'>{name}</div>
								<div class='category'>{category}</div>
							</div>
						</div>
					"
					flex: 1
					data: [{
						pic: 'https://fbcdn-profile-a.akamaihd.net/hprofile-ak-frc3/c0.0.628.628/s320x320/1379474_10152281554223765_259450346_n.jpg'
						name: 'Hardwell'
						category: 'Musician/Band'
					}, {
						pic: 'https://fbcdn-profile-a.akamaihd.net/hprofile-ak-frc3/c0.0.628.628/s320x320/1379474_10152281554223765_259450346_n.jpg'
						name: 'Braintribe'
						category: 'Musician/Band'
					}, {
						pic: 'https://fbcdn-profile-a.akamaihd.net/hprofile-ak-frc3/c0.0.628.628/s320x320/1379474_10152281554223765_259450346_n.jpg'
						name: 'Pioneers'
						category: 'Musician/Band'
					}]
				}]
			}]
		}]
