app.controllers.listDir = new Ext.Controller({
    initDir: function(options) {
    	app.stores.dirList = ['mnt','sdcard'];
    	ListDir.list("/mnt/sdcard/Geoinker", this.fillList,function(e){log(e)});
    },
    list: function(options){
    	var dir = '/'+app.stores.dirList.join('/');
    	ListDir.list(dir, this.fillList,function(e){log(e)});
    },
    fillList: function listSucc(r){ 
		app.views.viewport.setActiveItem(app.views.dirList);
		data = r.children;
		data.unshift({filename:'..',isdir:true});
		app.stores.fileList.removeAll();
		app.views.dirList.update();
		app.stores.fileList.add(data);
		app.views.dirList.show();
	}
});