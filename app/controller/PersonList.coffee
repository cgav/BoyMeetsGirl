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
					this.getApplication().getController('Profile').show('left', record)

			backButton:
				tap: (sender) ->
					this.getApplication().getController('Home').show('right')

	show: (direction = 'left') ->
		# store = Ext.getStore('Persons')
		# this.getPersonList().setStore(store)
		Ext.Viewport.animateActiveItem this.getView(), 
			type: 'slide'
			direction: direction