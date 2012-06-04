var menuBar = new Ext.Toolbar ({
	dock: 'bottom',   
	items: [{
		text: '隐藏',
        ui: 'back',
        handler: function () {
        	menuBar.hide();
            }
		},  {
	    text: '打开数据库',
        ui: 'action',
        handler: function () {
        	Ext.dispatch({
                controller: app.controllers.listDir,
                action: 'list',
                animation: {type:'slide', direction:'right'}
            	});
        	}
	    },{
		    text: '设置',
	        ui: 'action',
	        handler: function () {
	        	app.views.viewport.setActiveItem(app.views.setting);
	        	}
		 },{
			    text: 'test',
		        ui: 'action',
		        handler: function () {
		        	Ext.dispatch({
		                controller: app.controllers.map,
		                action: 'drawControl'
		            	});
		        	}
		 }, {
	    text: '定位',
        ui: 'action',
        handler: function () {
        	Ext.dispatch({
                controller: app.controllers.gps,
                action: 'getGPS'
            	});
	    	}
	    }]
	});
