Ext.regApplication({
    name: 'app',
    launch: function() {
        this.launched = true;
        this.mainLaunch();
    },
    mainLaunch: function() {
        if (!device || !this.launched) {return;}
    	document.addEventListener("menubutton", onMenuKeyDown, false);
    	document.addEventListener("backbutton", onBackKeyDown, false);
    	document.addEventListener("volumedownbutton", onVolumeDownKeyDown, false);
    	document.addEventListener("volumeupbutton", onVolumeUpKeyDown, false);
        this.views.viewport = new this.views.Viewport();
        menuBar.hide();
    }
});