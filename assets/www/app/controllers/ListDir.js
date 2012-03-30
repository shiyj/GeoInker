

app.controllers.listDir = new Ext.Controller({
    list: function(options) {
    	ListDir.list("/mnt/sdcard/GeoInker", listSucc,function(e){log(e)});
    	function listSucc(r){
    		 app.stores.fileList.root = {
    				    text: 'Gaaaaa',
    				    items: [{
    				            text: 'bbbbbbs',
    				            leaf: true
    				        }]
    				};
    		app.views.viewport.setActiveItem(app.views.dirList);
    	}
    }
});