var  ListDir = {
		list: function(directory,successCallback,failureCallback){
			return PhoneGap.exec(successCallback,failureCallback,'DirList','list',[directory]);
		}
};

var  SQLQuery = {
		getColumns: function(arg,successCallback,failureCallback){
			return PhoneGap.exec(successCallback,failureCallback,'SQLQuery','getColumns',[arg]);
		},
		getTables: function(arg,successCallback,failureCallback){
			return PhoneGap.exec(successCallback,failureCallback,'SQLQuery','getTables',[arg]);
		},
};