function onMenuKeyDown() {
	if (menuBar.isHidden()) {
		menuBar.show();
	} else {
		menuBar.hide();
	}

}
function onConfirm(button) {
	if (1 == button) {
		navigator.app.exitApp()
	}
}
function onBackKeyDown() {
	if (typeof(dbTableList) != "undefined") {
		if (!dbTableList.hidden) {
			dbTableList.hide();
			return;
		}
	}
	if (app.views.viewport.getActiveItem() != app.views.mapPanel) {
		app.views.viewport.setActiveItem(app.views.mapPanel);
		return;
	} else {
		navigator.notification.confirm('Exit GeoInker?', onConfirm, 'Exit', 'OK,Cencel');
	}
}

function onVolumeDownKeyDown() {
	app.controllers.map.map.zoomOut();
}

function onVolumeUpKeyDown() {
	app.controllers.map.map.zoomIn();
}
function onError(error) {
	alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
}

