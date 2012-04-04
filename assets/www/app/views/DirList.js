app.views.DirList = Ext.extend(Ext.List,{
	itemTpl : '<tpl if="isdir == true"><img class="my-img-folder"></tpl>{filename}',
    store: app.stores.fileList,
    listeners: {
    	itemtap:function(list,index,item,e){
    		
    	}
    }
});

