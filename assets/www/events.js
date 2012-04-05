function onMenuKeyDown() {
	if(menuBar.isHidden()){
		menuBar.show();
	}else{
		menuBar.hide();
	}
	
}
function onConfirm(button) {
    if(1==button){
    	navigator.app.exitApp()
    } 
}
function onBackKeyDown() {
	if(app.views.viewport.getActiveItem() != app.views.mapPanel){
		app.views.viewport.setActiveItem(app.views.mapPanel);
		return;
	} else {
		//alert("退出系统?");
		navigator.notification.confirm(
	            '确定退出程序?',
	            onConfirm,
	            '退出',
	            '确定,取消'
	        );
	}
}
function onError(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}