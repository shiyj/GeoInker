

app.views.DirList = Ext.extend(Ext.NestedList,{
    fullscreen: true,
    title: '文件列表',
    displayField: 'text',
    store: app.stores.fileList,
    listeners: {
    	itemtap:function(list,index,item,e){
    	},
    	leafitemtap:function(subList, subIdx, el, e, detailCard) {
    		
    	}
    }
});

