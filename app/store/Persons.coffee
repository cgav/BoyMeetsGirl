Ext.define 'BoyMeetsGirl.store.Persons', 
	extend: 'Ext.data.Store'

	config: 
		fields: ['eMail', 'foreName', 'surName', 'checkinTime', 'facebook_object']
		autoLoad: true
		proxy: 
			type: 'rest'
			url: '/visits'
			noCache: true
			limitParam: false
			enablePagingParams: false
			startParam: false