var  ListDir = {
		list: function(directory,successCallback,failureCallback){
			return PhoneGap.exec(successCallback,failureCallback,'DirList','list',[directory]);
		}
};

var  GetData = {
		get: function(directory,successCallback,failureCallback){
			return PhoneGap.exec(successCallback,failureCallback,'GetData','get',[directory]);
		}
};