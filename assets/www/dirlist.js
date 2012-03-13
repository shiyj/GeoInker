var  DirList = {
		list: function(directory,successCallback,failureCallback){
			return PhoneGap.exec(successCallback,failureCallback,'DirList','list',[directory]);
		}
};