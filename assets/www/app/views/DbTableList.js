app.views.DbTableList = Ext.extend(Ext.Panel, {
	floating: true,
	modal: true,
	centered: true,
	width: 200,
	height: 240,
	hideOnMaskTap: false,
	items: [],
	scroll: 'vertical',
	dockedItems: [{
		dock: 'top',
		xtype: 'toolbar',
		title: 'Select your layers'
	},
	{
		xtype: 'button',
		text: 'OK',
		ui: 'action',
		dock: 'bottom'
	}]
});

