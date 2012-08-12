app.views.Viewport = Ext.extend(Ext.Panel, {
    fullscreen: true,
    layout: 'card',
    cardSwitchAnimation: 'slide',
    initComponent: function() {
        //put instances of cards into app.views namespace
        Ext.apply(app.views, {
            mapPanel: new app.views.MapPanel(),
            dirList: new app.views.DirList(),
            setting: new app.views.SettingPanel()
        });
        //put instances of cards into viewport
        Ext.apply(this, {
            items: [
                app.views.mapPanel,
                app.views.dirList,
                app.views.setting
            ]
        });
        app.views.Viewport.superclass.initComponent.apply(this, arguments);
    }
});
