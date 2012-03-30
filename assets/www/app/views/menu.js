var menuBar = new Ext.Toolbar ({
	dock: 'bottom',   
	items: [{
		text: '隐藏',
        ui: 'back',
        handler: function () {
        	menuBar.hide();
            }
		},  {
	    text: '测试',
        ui: 'action',
        handler: function () {
        	Ext.dispatch({
                controller: app.controllers.listDir,
                action: 'list',
                animation: {type:'slide', direction:'right'}
            });
        	
        	}
	    },{
		    text: 'test again',
	        ui: 'action',
	        handler: function () {
	        	ListDir.list("/mnt/sdcard", function(r){alert(r)},function(e){log(e)});
	        	}
		 }, {
	    text: '踩点',
        ui: 'action',
        handler: function () {
        	navigator.geolocation.getCurrentPosition(onGeoSuccess, onError);
	    	}
	    }]
	});
