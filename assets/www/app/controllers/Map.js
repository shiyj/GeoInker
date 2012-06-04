app.controllers.map = new Ext.Controller({
	drawPoint: null,
	vector: new OpenLayers.Layer.Vector('Vector Layer', {
        styleMap: new OpenLayers.StyleMap({'default':{
            strokeColor: "#0000FF",
            strokeOpacity: 1,
            strokeWidth: 3,
            fillColor: "#5500FF",
            fillOpacity: 0.5,
            pointRadius: 6,
            pointerEvents: "visiblePainted",
        }})
    }),
    dbvector: new OpenLayers.Layer.Vector('Database Vector Layer', {
		styleMap: new OpenLayers.StyleMap({'default':{
			strokeColor: "#00FF00",
			strokeOpacity: 1,
	    	strokeWidth: 3,
	    	fillColor: "#FF5500",
	    	fillOpacity: 0.5,
	    	pointRadius: 6,
	    	pointerEvents: "visiblePainted",
	    	label : " ${name} ",       
	    	fontColor: "red",
	    	fontSize: "12px",
	    	fontFamily: "Courier New, monospace",
	    	fontWeight: "bold",
	    	labelAlign: "cm",
	    	labelXOffset: "${xOffset}",
	    	labelYOffset: "${yOffset}"
		}})
	}),
	positionVector:new OpenLayers.Layer.Vector('Position Vector Layer', {
        styleMap: new OpenLayers.StyleMap({'default':{
            strokeColor: "#FF0000",
            strokeOpacity: 1,
            strokeWidth: 3,
            fillColor: "#55FF00",
            fillOpacity: 0.5,
            pointRadius: 8,
            pointerEvents: "visiblePainted",
        }})
    }),
    toolbar: new OpenLayers.Control.Panel({
        displayClass: 'olControlEditingToolbar'
    }),
    wms: new OpenLayers.Layer.WMS( "OpenLayers WMS","http://vmap0.tiles.osgeo.org/wms/vmap0", {layers: 'basic'} ),
    map:null,
	initMap: function(options){
		this.drawPoint = new OpenLayers.Control.DrawFeature(this.positionVector, OpenLayers.Handler.Point);
	    this.toolbar.addControls([
	        new OpenLayers.Control({
	            displayClass: 'olControlNavigation'
	        }),
	        new OpenLayers.Control.ModifyFeature(this.vector, {
	            vertexRenderIntent: 'default',
	            displayClass: 'olControlModifyFeature'
	        }),
	        new OpenLayers.Control.DrawFeature(this.vector, OpenLayers.Handler.Point, {
	            displayClass: 'olControlDrawFeaturePoint'
	        }),
	        new OpenLayers.Control.DrawFeature(this.vector, OpenLayers.Handler.Path, {
	            displayClass: 'olControlDrawFeaturePath'
	        }),
	        new OpenLayers.Control.DrawFeature(this.vector, OpenLayers.Handler.Polygon, {
	            displayClass: 'olControlDrawFeaturePolygon'
	        })
	    ]);
	    //wms = new OpenLayers.Layer.WMS( "WORLD","http://10.0.2.2/cgi-bin/mapserv?map=/home/engin/webapp/ms4w/apps/tutorial/htdocs/world.map&", {layers: 'world_adm0'},{gutter: 15} );
	    this.map = new OpenLayers.Map({
	        div: 'map',
	        projection: 'EPSG:4326',
	        units: 'm',
	        numZoomLevels: 18,
	        maxResolution: 1,
	        maxExtent: new OpenLayers.Bounds(
	        		-181.00,-91.00 , 181.00,91.00
	        ),
	        controls: [
	            new OpenLayers.Control.TouchNavigation(),
	            new OpenLayers.Control.ZoomPanel(),
	            this.toolbar
	        ],
	        layers: [this.wms, this.vector,this.positionVector],
	        center: new OpenLayers.LonLat(113, 30),
	        zoom: 6,
	        theme: null
	    });
	    this.toolbar.controls[0].activate();
	},
	openDatabase: function(options){		
		var Feature = OpenLayers.Feature.Vector;
		var Geometry = OpenLayers.Geometry;
		var  dir = '/'+app.stores.dirList.join('/') +'/' + options.filename;
		SQLQuery.getColumns(dir,function(r){showSQL(r)},function(e){log(e)});
		function showSQL(r){
			var len = r.points.length;
			if(len == 0){
				alert("Not a Sqlite Database!");
			}
			var features = [];
			for(var i =0;i<len;i++){
		    	var tmp =new Feature(Geometry.fromWKT(r.points[i].xypoint));
		    	tmp.attributes = {
		                    name: r.points[i].name
		        	};
				features.push( tmp )
		    }
			//运行上下文改变,不能再用this.
			app.controllers.map.dbvector.addFeatures(features);
			app.controllers.map.map.addLayer(app.controllers.map.dbvector)
			app.views.viewport.setActiveItem(app.views.mapPanel);
		} 
	},
	finishDraw: function(){
		var len = this.toolbar.controls.length
		for(var i = 0; i<len; i++){
			if(this.toolbar.controls[i].active)
				this.toolbar.controls[i].finishSketch();
		}
	},
	getTables: function(filename){
		
	}
})