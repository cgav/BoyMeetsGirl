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
					pic: 'https://fbcdn-profile-a.akamaihd.net/hprofile-ak-frc3/c0.0.628.628/s320x320/1379474_10152281554223765_259450346_n.jpg'
					name: 'Julia N.'
				}, {
					pic: 'https://fbcdn-profile-a.akamaihd.net/hprofile-ak-frc3/c0.0.628.628/s320x320/1379474_10152281554223765_259450346_n.jpg'
					name: 'Julia N.'
				}, {
					pic: 'https://fbcdn-profile-a.akamaihd.net/hprofile-ak-frc3/c0.0.628.628/s320x320/1379474_10152281554223765_259450346_n.jpg'
					name: 'Julia N.'
				}]
			}]
		}]
