app.controllers.listDir = new Ext.Controller({
    list: function(options){
    	var dir = '/'+app.stores.dirList.join('/');
    	ListDir.list(dir, this.fillList,function(e){log(e)});
    },
    fillList: function listSucc(r){ 
		app.views.viewport.setActiveItem(app.views.dirList);
		data = r.children;
		data.sort(function(a,b){
			if(a.isdir == b.isdir){
				return a.filename.toLowerCase() > b.filename.toLowerCase() ? 1 : -1;
			} else {
				return b.isdir > a.isdir ? 1 : -1;
			}
		});
		data.unshift({filename:'..',isdir:true});
		app.stores.fileList.removeAll();
		app.views.dirList.update();
		app.stores.fileList.add(data);
		app.views.dirList.show();
	}
});