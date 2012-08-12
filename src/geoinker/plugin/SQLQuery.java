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
	
	private JSONArray dataList = null;
	private String filename = "";
	private String queryString = "";
	
	private void getSQLData() {
		try {
			//Class.forName("SQLite.JDBCDriver").newInstance();
			Class.forName("org.sqldroid.SQLDroidDriver").newInstance();
				
			// db.open(Environment.getExternalStorageDirectory() +
			// "/download/test-2.3.sqlite",jsqlite.Constants.SQLITE_OPEN_READONLY);
			jsqlite.Database db = new jsqlite.Database();
			db.open(filename,jsqlite.Constants.SQLITE_OPEN_READONLY);
			Callback cb = new Callback() {
				private String queryColumns ="" ;
				public void columns(String[] coldata) {
					queryColumns = Arrays.toString(coldata);
					 Log.v("columns", "Columns: " +queryColumns);
				}

				public void types(String[] types) {
					Log.v("type", "Types: " + Arrays.toString(types));
				}

				public boolean newrow(String[] rowdata){
					Log.v("行:", "Row: " + Arrays.toString(rowdata));
					
					try{
						JSONObject data = new JSONObject();
						Log.v("queryColumns", queryColumns);
						if(queryColumns.equals("[f_table_name]"))
						{
							Log.v("GeoDB Columns", Arrays.toString(rowdata));
							data.put("name", rowdata[0]);
						}
						else
						{
							data.put("data", rowdata[0]);
						}
						dataList.put(data);
					}catch (JSONException jsonEx) {
						 Log.d("DirectoryListPlugin", "Got JSON Exception " + jsonEx.getMessage());
					}
					return false;
				}
			};

			//String query = "SELECT name, peoples, AsText(Geometry) from Towns where peoples > 350000";

			try{
			db.exec(queryString, cb);
			}catch(Exception e){
				Log.v("DB ERROR/数据库查询执行失败:", e.toString());
				return;
			}
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
		dataList = new JSONArray();
		if(TABLES.equals(action)) {
			try {
				JSONObject point = new JSONObject();
				filename = data.getString(0);
				queryString = "SELECT DISTINCT f_table_name from geometry_columns";
				getSQLData();
				point.put("datas", dataList);
				Log.d("数据库插件","返回"+point.toString());
				result = new PluginResult(Status.OK,point); 
			} catch (JSONException jsonEx) {
				 Log.d("DirectoryListPlugin", "Got JSON Exception " + jsonEx.getMessage());
			}
		}else if(COLUMNS.equals(action)){
			try {
				JSONObject point = new JSONObject();
				String table = data.getString(0);
				String [] tables = table.split(";");
				int len = tables.length;
				if(0==len)
				{
					return new PluginResult(Status.JSON_EXCEPTION);
				}
				for(int i=0;i<len;i++)
				{
					queryString = "SELECT AsText(Geometry) from " +tables[i] ;
					getSQLData();
				}
				point.put("datas", dataList);
				result = new PluginResult(Status.OK,point);
			} catch(JSONException jsonEx){
				Log.d("DirectoryListPlugin", "Got JSON Exception " + jsonEx.getMessage());
			}
		} else {
			result = new PluginResult(Status.JSON_EXCEPTION);
		}
		return result;
	}
}
