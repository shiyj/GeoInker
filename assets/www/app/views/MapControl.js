var mapcontrollist = new Ext.List({
	itemTpl : '{name}',
    store: app.stores.mapControl,
    listeners: {
    	itemtap:function(list,index,item,e){
    		var action = this.store.data.items[index].data.action;
    		Ext.dispatch({
	            controller: app.controllers.map,
	            action: action,
    		});
    	}
    }
});

mapControl =new Ext.Panel({
                floating: true,
                modal: true,
                centered: true,
                width: 200,
                height:240,
                hideOnMaskTap: true,
                items: [mapcontrollist],
                scroll: 'vertical'
            });