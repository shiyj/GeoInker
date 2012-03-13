var overlayTb = new Ext.Toolbar({
	dock: 'top'
});
    
var overlay = new Ext.Panel({
	floating: true,
	modal: true,
	centered: false,
	width: Ext.is.Phone ? 260 : 400,
	height: Ext.is.Phone ? 220 : 400,
	styleHtmlContent: true,
	dockedItems: overlayTb,
	scroll: 'vertical',
	contentEl: 'lipsum',
	cls: 'htmlcontent'
});

var showOverlay = function(btn, event) {
	overlay.setCentered(false);
	overlayTb.setTitle('Attached Overlay');
	//overlay.showBy(btn);
	overlay.show();
};
    
var showCenteredOverlay = function(btn, event) {
	overlay.setCentered(true);
	overlayTb.setTitle('Centered Overlay');
	overlay.show();
};


var dockedItems = [{
		dock: 'bottom',
		xtype: 'toolbar',
		items: [{
			text: 'show (centered)',
			handler: showCenteredOverlay             
			}, {xtype: 'spacer'}, {
				text: 'showBy',
				handler: showOverlay
		}]
	}];