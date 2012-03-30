package geoinker.plugin;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.util.Log;

import com.phonegap.api.Plugin;
import com.phonegap.api.PluginResult;
import com.phonegap.api.PluginResult.Status;

public class HelloWorld extends Plugin {

	public static final String ACTION ="hello";
	@Override
	public PluginResult execute(String action, JSONArray data, String callbackId) {
		PluginResult result = null;
		if(ACTION.equals(action)) {
			try {
				String name = data.getString(0);
				JSONObject fileInfo = new JSONObject();
				fileInfo.put("hello", sayHello(name));
				result = new PluginResult(Status.OK,fileInfo); 
			} catch (JSONException jsonEx) {
				 Log.d("HelloWorldPlugin", "Got JSON Exception " + jsonEx.getMessage());
			}
		} else {
			result = new PluginResult(Status.JSON_EXCEPTION);
		}
		return result;
	}
	private String sayHello(String name){
		return "hello world from: "+name;
	}
}
