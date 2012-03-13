package com.plugin.test;

import java.io.File;
import java.util.Arrays;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.phonegap.api.Plugin;
import com.phonegap.api.PluginResult;
import com.phonegap.api.PluginResult.Status;

import jsqlite.Callback;

import android.util.Log;


public class GetData extends Plugin {
	public static final String ACTION ="get";
	
	private JSONArray pointList = new JSONArray();
	
	private void getSQLData() {
		try {
			Class.forName("SQLite.JDBCDriver").newInstance();
			jsqlite.Database db = new jsqlite.Database();
			// 检测、创建数据库的文件夹
			File dir = new File("/mnt/sdcard/");
			if (!dir.exists()) {
				dir.mkdir();
			}
			// 如果文件夹已经存在了
			else {
				// 检查文件是否存在
				dir = new File("/mnt/sdcard/", "henan.sqlite");
				if (!dir.exists()) {
					Log.v("不存在!", "不存在地理数据库！");
					return;
				}
			}
			// db.open(Environment.getExternalStorageDirectory() +
			// "/download/test-2.3.sqlite",jsqlite.Constants.SQLITE_OPEN_READONLY);
			db.open("/mnt/sdcard/henan.sqlite",
					jsqlite.Constants.SQLITE_OPEN_READONLY);
			Callback cb = new Callback() {
				public void columns(String[] coldata) {
					// Log.v(TAG, "Columns: " + Arrays.toString(coldata));
				}

				public void types(String[] types) {
					// Log.v(TAG, "Types: " + Arrays.toString(types));
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
			String query = "SELECT name,AsText(Geometry) from Polygon";
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
		PluginResult result = null;
		if(ACTION.equals(action)) {
			try {
				JSONObject point = new JSONObject();
				
				getSQLData();
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
