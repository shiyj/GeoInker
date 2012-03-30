// store with data
var dd = {
    text: 'Groceries',
    items: [{
            text: 'Wasabi Peas',
            leaf: true
        }]
};

Ext.regModel('app.models.FileList', {
    fields: [{name: 'text', type: 'string'}]
});
app.stores.fileList = new Ext.data.TreeStore({
    model: 'app.models.FileList',
    root: dd,
    proxy: {
        type: 'ajax',
        reader: {
            type: 'tree',
            root: 'items'
        }
    }
});
