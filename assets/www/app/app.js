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
        this.views.viewport = new this.views.Viewport();
        menuBar.hide();
    }
});