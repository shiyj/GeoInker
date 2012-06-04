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
		        	if(Ext.util.JSONP.current)
		        		Ext.util.JSONP.current=null;
		        		Ext.util.JSONP.request({
		        		    url: 'http://10.0.2.2:3000/m_join',
		        		    params: {
		        				uid: Date.parse(new Date()),
		        				nick: "aaaa",
		        				lat: 10,
		        				lon: 10
		        				},
		        		    callbackKey: 'callback',
		        		    callback: function(result) {
		        					var sessionid=result.id;
		        					var since=result.starttime;
		        					if(sessionid && since){
		        						alert("join successed with session id"+sessionid);
		        					}else {
		        						alert('join failed');
		        					}
		        		    },
		        		});
		        	}
		 }, {
	    text: '定位',
        ui: 'action',
        handler: function () {
        	Ext.dispatch({
                controller: app.controllers.gps,
                action: 'getGPS',
                animation: {type:'slide', direction:'right'}
            	});
	    	}
	    }]
	});
