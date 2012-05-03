app.controllers.gps = new Ext.Controller({
	getGPS: function(){
		navigator.geolocation.getCurrentPosition(this.onGeoSuccess, onError,{  maximumAge: 3000, timeout: 10000,enableHighAccuracy: true });
	},
	onError:function(err){
		alert(err);
	},
	onGeoSuccess:function (position) {
	    var html = 'Latitude: '           + position.coords.latitude              + '<br />' +
	                        'Longitude: '          + position.coords.longitude             + '<br />' +
	                        'Altitude: '           + position.coords.altitude              + '<br />' +
	                        'Accuracy: '           + position.coords.accuracy              + '<br />' +
	                        'Altitude Accuracy: '  + position.coords.altitudeAccuracy      + '<br />' +
	                        'Heading: '            + position.coords.heading               + '<br />' +
	                        'Speed: '              + position.coords.speed                 + '<br />' +
	                        'Timestamp: '          + new Date(position.timestamp)          + '<br />';
	    alert(html);
	}	
});
