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
                action: 'initDir',
                animation: {type:'slide', direction:'right'}
            });
        	
        	}
	    },{
		    text: 'test again',
	        ui: 'action',
	        handler: function () {
	        	
	        	}
		 }, {
	    text: '踩点',
        ui: 'action',
        handler: function () {
        	//navigator.geolocation.getCurrentPosition(onGeoSuccess, onError);
	    	}
	    }]
	});