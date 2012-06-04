app.views.SettingPanel= new Ext.extend(Ext.Panel,{
		id: 'settingPanel',
		fullscreen: true,
		defaults: {style: 'font-size: 24px;'},
		items: [{
                xtype: 'textfield',
                name: 'name',
                label: 'name',
                id: 'userName',
                required: true
            },{
                xtype: 'textfield',
                name: 'lat',
                label: '纬度',
                id: 'lat',
                required: true
            },{
                xtype: 'textfield',
                name: 'lon',
                label: '经度',
                id: 'lon',
                required: true
            },{
            	xtype: 'button',
                text: 'OK',
                ui: 'action',
                handler: function(){
            		var userName=Ext.getCmp('userName').getValue();
            		var lat=Ext.getCmp('lat').getValue();
            		var lon=Ext.getCmp('lon').getValue();
            		if(userName==''|| lat==''||lon==''){
            			alert('所有数据不能为空');
            			return;
            		}
            		if(Ext.util.JSONP.current)
            			Ext.util.JSONP.current=null;
            			Ext.util.JSONP.request({
            			    url: 'http://giszzu.tk/m_join',
            			    params: {
            					uid: Date.parse(new Date()),
            					nick: userName,
            					lat: lat,
            					lon: lon
            					},
            			    callbackKey: 'callback',
            			    callback: function(result) {
            						var sessionid=result.id;
            						if(sessionid){
            							alert("join successed with session id"+sessionid);
            						}else {
            							alert('join failed');
            						}
            						//Ext.getBody().unmask();
            			    },
            			});
            		
            	}
        }
        ],

	});