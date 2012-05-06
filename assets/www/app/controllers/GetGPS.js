app.controllers.gps = new Ext.Controller({
	getGPS: function(){
		navigator.geolocation.getCurrentPosition(this.onGeoSuccess, onError,{  maximumAge: 3000, timeout: 10000,enableHighAccuracy: true });
	},
	onError:function(err){
		alert(err);
	},
	onGeoSuccess:function (position) {
	    var latlon = new OpenLayers.LonLat(position.coords.longitude,position.coords.latitude);
	    app.controllers.map.map.panTo(latlon);
	    var point = new OpenLayers.Geometry.Point(position.coords.longitude,position.coords.latitude);
	    app.controllers.map.positionVector.removeAllFeatures();
	    app.controllers.map.drawPoint.drawFeature(point);
	}	
});
