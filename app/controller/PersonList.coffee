Ext.define 'BoyMeetsGirl.controller.PersonList',
	extend: 'Ext.app.Controller'
	config:
		refs:
			view:
				selector: 'personlist'
				xtype: 'personlist'
				autoCreate: true
			personList: 'personlist #personList'
			backButton: 'personlist #backButton'

		control:
			personList:
				itemtap: (sender, index, target, record) ->
					this.getApplication().getController('Profile').show()

			backButton:
				tap: (sender) ->
					this.getApplication().getController('Home').show('right')

	show: (direction = 'left') ->
		Ext.Viewport.animateActiveItem this.getView(), 
			type: 'slide'
			direction: direction