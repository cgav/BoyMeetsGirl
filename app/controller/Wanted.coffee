Ext.define 'BoyMeetsGirl.controller.Wanted',
	extend: 'Ext.app.Controller'
	config:
		refs:
			view:
				selector: 'wanted'
				xtype: 'wanted'
				autoCreate: true
			wantedList: 'wanted #wantedList'
			backButton: 'wanted #backButton'

		control:
			wantedList:
				itemtap: (sender, index, target, record) ->
					this.getApplication().getController('Find').show('left', record)

			backButton:
				tap: (sender) ->
					this.getApplication().getController('Home').show('right')


	show: (direction = 'left') ->
		Ext.Viewport.animateActiveItem this.getView(), 
			type: 'slide'
			direction: direction