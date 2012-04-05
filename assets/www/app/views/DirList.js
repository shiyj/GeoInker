app.views.DirList = Ext.extend(Ext.List,{
	itemTpl : '<tpl if="isdir == true"><img class="my-img-folder"></tpl>{filename}',
    store: app.stores.fileList,
    listeners: {
    	itemtap:function(list,index,item,e){
    		var filename = this.store.data.items[index].data.filename;
    		var isdir = this.store.data.items[index].data.isdir;
    		if(isdir){
    			app.stores.dirList.push(filename);
    			Ext.dispatch({
                    controller: app.controllers.listDir,
                    action: 'list',
                    animation: {type:'slide', direction:'right'}
                });
    		} else {
    			alert(filename);
    		}
    	}
    }
});

