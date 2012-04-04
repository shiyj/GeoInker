function onMenuKeyDown() {
	if(menuBar.isHidden()){
		menuBar.show();
	}else{
		menuBar.hide();
	}
	
}

function onError(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}