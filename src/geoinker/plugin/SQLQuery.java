package geoinker.plugin;

import java.util.Arrays;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.phonegap.api.Plugin;
import com.phonegap.api.PluginResult;
import com.phonegap.api.PluginResult.Status;

import jsqlite.Callback;

import android.util.Log;


public class SQLQuery extends Plugin {
	public static final String COLUMNS ="getColumns";
	public static final String TABLES = "getTables";
	
	private JSONArray pointList = new JSONArray();
	
	private void getSQLData(String action,String data) {
		try {
			Class.forName("SQLite.JDBCDriver").newInstance();
			jsqlite.Database db = new jsqlite.Database();
			Log.v("数据库传人data", data);
			
			// db.open(Environment.getExternalStorageDirectory() +
			// "/download/test-2.3.sqlite",jsqlite.Constants.SQLITE_OPEN_READONLY);
			db.open(data,
					jsqlite.Constants.SQLITE_OPEN_READONLY);
			Callback cb = new Callback() {
				public void columns(String[] coldata) {
					 Log.v("columns", "Columns: " + Arrays.toString(coldata));
				}

				public void types(String[] types) {
					Log.v("type", "Types: " + Arrays.toString(types));
				}

				public boolean newrow(String[] rowdata){
					Log.v("行:", "Row: " + Arrays.toString(rowdata));
					JSONObject point = new JSONObject();
					try{
						point.put("name", rowdata[0]);
						point.put("xypoint", rowdata[1]);
						pointList.put(point);
					}catch (JSONException jsonEx) {
						 Log.d("DirectoryListPlugin", "Got JSON Exception " + jsonEx.getMessage());
					}
					return false;
				}
			};

			//String query = "SELECT name, peoples, AsText(Geometry) from Towns where peoples > 350000";
			String query;
			if(COLUMNS.equals(action))
				query = "SELECT name,AsText(Geometry) from Polygon";
			else 
				query = "SELECT DISTINCT f_table_name from geometry_columns";
			db.exec(query, cb);
		} catch (IllegalAccessException e) {
			e.printStackTrace();
		} catch (InstantiationException e) {
			e.printStackTrace();
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@Override
	public PluginResult execute(String action, JSONArray data, String callbackId) {
		Log.d("数据库插件","插件运行ing");
		Log.d("数据库插件",action);
		PluginResult result = null;
		if(TABLES.equals(action)||COLUMNS.equals(action)) {
			try {
				JSONObject point = new JSONObject();
				getSQLData(action,data.getString(0));
				point.put("points", pointList);
				Log.d("数据库插件","返回"+point.toString());
				result = new PluginResult(Status.OK,point); 
			} catch (JSONException jsonEx) {
				 Log.d("DirectoryListPlugin", "Got JSON Exception " + jsonEx.getMessage());
			}
		} else {
			result = new PluginResult(Status.JSON_EXCEPTION);
		}
		return result;
	}
}
