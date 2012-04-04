app.controllers.listDir = new Ext.Controller({
    initDir: function(options) {
    	ListDir.list("/mnt/sdcard/GeoInker", listSucc,function(e){log(e)});
    	function listSucc(r){ 
    		app.views.viewport.setActiveItem(app.views.dirList);
    		data = r.children;
    		app.stores.fileList.removeAll();
    		app.stores.fileList.add(data)
    		app.views.dirList.show();
    	}
    },
    list: function(options){
    	ListDir.list("/mnt/sdcard/GeoInker", listSucc,function(e){log(e)});
    	function listSucc(r){ 
    		console.log(this);
    	}
    }
});