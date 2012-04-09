app.views.MapPanel = Ext.extend(Ext.Panel, {
	id: 'mapPanel',
	fullscreen: true,
	items: [{
		xtype: 'component',
		fullscreen: true,
		layout: 'fit',
        id: 'map',
		listeners: {
			render: function(){
				Ext.dispatch({
                    controller: app.controllers.map,
                    action: 'init',
                    animation: {type:'slide', direction:'right'}
                });
			}
		}
	}],
	dockedItems:[menuBar]
});