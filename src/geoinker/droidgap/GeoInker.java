package geoinker.droidgap;

import java.io.File;

import android.os.Bundle;
import android.view.KeyEvent;

import com.phonegap.*;


public class GeoInker extends DroidGap
{
	private void geoinkerInit()
	{
		File dir1 = new File("/mnt/sdcard/GeoInker");
		mkdatadir(dir1);
		File dir2 = new File("/mnt/sdcard/GeoInker/database");
		mkdatadir(dir2);
		File dir3 = new File("/mnt/sdcard/GeoInker/shp");
		mkdatadir(dir3);
		
	}
	private void mkdatadir(File dir)
	{
		if (!dir.exists()) {
			dir.mkdir();
		}
	}
    @Override
    public void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        super.setIntegerProperty("splashscreen", R.drawable.splash);
        geoinkerInit();
        super.loadUrl("file:///android_asset/www/index.html");
    }
    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {
    	
    	 if (super.appView == null) {
             return super.onKeyDown(keyCode, event);
         }
    	 if (keyCode == KeyEvent.KEYCODE_VOLUME_UP){
    		 super.appView.loadUrl("javascript:PhoneGap.fireDocumentEvent('volumeupbutton');");
    		 return true;
    	 } else  if (keyCode == KeyEvent.KEYCODE_VOLUME_DOWN){
    		 super.appView.loadUrl("javascript:PhoneGap.fireDocumentEvent('volumedownbutton');");
    		 return true;
    	 }
         return super.onKeyDown(keyCode, event);
    }
}

