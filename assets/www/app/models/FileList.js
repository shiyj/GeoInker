Ext.regModel('app.models.FileList', {
    fields: [{name: 'filename', type: 'string'},
             {name: 'isdir',type: 'boolean'}]
});
app.stores.dirList = ['mnt','sdcard','Geoinker'];
app.stores.fileList = new Ext.data.Store({
    model: 'app.models.FileList',
    sorters: 'filename',
    data: [{filename: 'sdcard',isdir: true}]
});
