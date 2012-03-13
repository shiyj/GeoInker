var menuBar = new Ext.Toolbar ({
	dock: 'bottom',   
	items: [{
		text: '隐藏',
        ui: 'back',
        handler: function () {
        	menuBar.hide();
            }
		}, {
	    text: '撤销',
        ui: 'action',
        handler: function () {
	    	}
	    }, {
	    text: '恢复',
        ui: 'action',
        handler: function () {
        	}
	    }, {
	    text: '踩点',
        ui: 'action',
        handler: function () {
        	navigator.geolocation.getCurrentPosition(onGeoSuccess, onError);
	    	}
	    }]
	});
