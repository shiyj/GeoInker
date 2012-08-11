app.views.DirList = Ext.extend(Ext.List,{
	itemTpl : '<tpl if="isdir == true"><img class="my-img-folder"></tpl>{filename}',
    store: app.stores.fileList,
    listeners: {
    	itemtap:function(list,index,item,e){
    		var filename = this.store.data.items[index].data.filename;
    		var isdir = this.store.data.items[index].data.isdir;
    		if(isdir){
    			if(0==index){
    				app.stores.dirList.pop(filename);
    			} else {
    				app.stores.dirList.push(filename);
    			}
    			
    			Ext.dispatch({
                    controller: app.controllers.listDir,
                    action: 'list',
                    animation: {type:'slide', direction:'right'}
                });
    		} else {
    			navigator.notification.confirm(
    		            'Open '+filename+' ?',
    		            function(button){
    		            	if(1==button){
	        			    	Ext.dispatch({
	        			    		controller: app.controllers.map,
	        			    		action: 'openDatabase',
	        			    		filename: filename
	        			    	})	
        			    }},
    		            'Open The Database',
    		            'OK,Cancle'
    		        );
    			
    		}
    	}
    }
});

