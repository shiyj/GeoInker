Ext.regModel('app.models.MapControl', {
    fields: [{name: 'action', type: 'string'},
             {name: 'name',type: 'string'}]
});
app.stores.dirList = ['mnt','sdcard','Geoinker'];
app.stores.mapControl = new Ext.data.Store({
    model: 'app.models.MapControl',
    data: [{action:'finishDraw',name:'Finish'},
           {action:'undoDraw',name: 'Undo'},
           {action:'redoDraw',name: 'Redo'},
           {action:'cancelDraw',name: 'Cancel'}]
});
