app.controllers.map = new Ext.Controller({
	init: function(options){
		 // create a vector layer for drawing
	    var vector = new OpenLayers.Layer.Vector('Vector Layer', {
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
	    });
	    var Feature = OpenLayers.Feature.Vector;
	    var Geometry = OpenLayers.Geometry;
	    SQLQuery.getColumns("getColumns",function(r){showSQL(r)},function(e){log(e)});
	    function showSQL(r){
	    	var len = r.points.length;
	    	var features = [];
	    	for(var i =0;i<len;i++){
	    		var tmp =new Feature(Geometry.fromWKT(r.points[i].xypoint));
	    		tmp.attributes = {
	                    name: r.points[i].name
	                };
		    	features.push( tmp )
	    	}
	    	vector.addFeatures(features);
	    }
	    
	    // OpenLayers' EditingToolbar internally creates a Navigation control, we
	    // want a TouchNavigation control here so we create our own editing toolbar
	    var toolbar = new OpenLayers.Control.Panel({
	        displayClass: 'olControlEditingToolbar'
	    });
	    toolbar.addControls([
	        // this control is just there to be able to deactivate the drawing
	        // tools
	        new OpenLayers.Control({
	            displayClass: 'olControlNavigation'
	        }),
	        new OpenLayers.Control.ModifyFeature(vector, {
	            vertexRenderIntent: 'default',
	            displayClass: 'olControlModifyFeature'
	        }),
	        new OpenLayers.Control.DrawFeature(vector, OpenLayers.Handler.Point, {
	            displayClass: 'olControlDrawFeaturePoint'
	        }),
	        new OpenLayers.Control.DrawFeature(vector, OpenLayers.Handler.Path, {
	            displayClass: 'olControlDrawFeaturePath'
	        }),
	        new OpenLayers.Control.DrawFeature(vector, OpenLayers.Handler.Polygon, {
	            displayClass: 'olControlDrawFeaturePolygon'
	        })
	    ]);

	    wms = new OpenLayers.Layer.WMS( "OpenLayers WMS","http://vmap0.tiles.osgeo.org/wms/vmap0", {layers: 'basic'} );
	    //wms = new OpenLayers.Layer.WMS( "WORLD","http://10.0.2.2/cgi-bin/mapserv?map=/home/engin/webapp/ms4w/apps/tutorial/htdocs/world.map&", {layers: 'world_adm0'},{gutter: 15} );
	    map = new OpenLayers.Map({
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
	            toolbar
	        ],
	        layers: [wms, vector],
	        center: new OpenLayers.LonLat(113, 34),
	        zoom: 4,
	        theme: null
	    });

	    // activate the first control to render the "navigation icon"
	    // as active
	    toolbar.controls[0].activate();
	},
	openDatabase: function(options){
		console.log(options.filename);
	}
})