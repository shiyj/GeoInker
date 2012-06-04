Ext.regModel('app.models.MapControl', {
    fields: [{name: 'action', type: 'string'},
             {name: 'name',type: 'string'}]
});
app.stores.dirList = ['mnt','sdcard','Geoinker'];
app.stores.mapControl = new Ext.data.Store({
    model: 'app.models.MapControl',
    data: [{action:'finishDraw',name:'完成'},
           {action:'undoDraw',name: '撤销'},
           {action:'redoDraw',name: '恢复'},
           {action:'cancelDraw',name: '取消'}]
});