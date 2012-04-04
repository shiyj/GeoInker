/**
 * 
 */
package geoinker.plugin;

import java.io.File;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.util.Log;

import com.phonegap.api.Plugin;
import com.phonegap.api.PluginResult;
import com.phonegap.api.PluginResult.Status;

/**
 * @author engin
 *
 */
public class ListDir extends Plugin {
	
	public static final String ACTION ="list";

	/* (non-Javadoc)
	 * @see com.phonegap.api.Plugin#execute(java.lang.String, org.json.JSONArray, java.lang.String)
	 */
	@Override
	public PluginResult execute(String action, JSONArray data, String callbackId) {
		Log.d("列表插件","插件运行ing");
		Log.d("data内容:",data.toString());
		PluginResult result = null;
		if(ACTION.equals(action)) {
			try {
				String fileName = data.getString(0);
				fileName = data.optString(0);
				JSONObject fileInfo = getDirList(new File(fileName));
				Log.d("列表插件","返回"+fileInfo.toString());
				result = new PluginResult(Status.OK,fileInfo); 
			} catch (JSONException jsonEx) {
				 Log.d("DirectoryListPlugin", "Got JSON Exception " + jsonEx.getMessage());
			}
		} else {
			result = new PluginResult(Status.JSON_EXCEPTION);
		}
		return result;
	}
	private JSONObject getDirList(File file) throws JSONException {
		JSONObject fileInfo = new JSONObject();
		fileInfo.put("filename", file.getName());
		fileInfo.put("isdir", file.isDirectory());
		if(file.isDirectory()) {
			JSONArray children = new JSONArray();
			fileInfo.put("children", children);
			for(File child : file.listFiles()) {
				JSONObject childrendir = new JSONObject();
				childrendir.put("filename", child.getName());
				childrendir.put("isdir", child.isDirectory());
				children.put(childrendir);
			}
		}
		return fileInfo;
	}
}
