Ext.define 'BoyMeetsGirl.view.Wanted',
	extend: 'Ext.Container'
	xtype: 'wanted'

	requires: [
		'Ext.List'
	]

	config:
		fullscreen: true
		cls: 'wanted'
		layout: 'vbox'
		items: [{
			xtype: 'container'
			cls: 'title-toolbar'
			layout: 'hbox'
			items: [{
				xtype: 'button'
				itemId: 'backButton'
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
				xtype: 'list'
				itemId: 'wantedList'
				flex: 1
				pressedCls: 'item-tapped'
				selectedCls: 'item-tapped'
				itemTpl: "
					<div class='item'>
						<div class='pic'>
							<img src='{pic}' />
						</div>
						<div class='description'>
							<div class='name'>{name}</div>
							<button class='button inline-button orange'>
								<div class='x-button-label'>
									I want to meet her too
								</div>
							</button>
						</div>
					</div>
				"
				data: [{
					pic: 'https://fbcdn-profile-a.akamaihd.net/hprofile-ak-frc3/c0.0.180.180/s160x160/1379474_10152281554223765_259450346_a.jpg'
					name: 'Heidi B.'
					qr: parseInt(Math.random() * 1000000)
				}, {
					pic: 'https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash4/c44.45.551.551/s160x160/1001802_10201074269431330_545721157_n.jpg'
					name: 'Susanna N.'
					qr: parseInt(Math.random() * 1000000)
				}]
			}]
		}]
