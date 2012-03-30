package geoinker.droidgap;

import java.io.File;

import android.os.Bundle;
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
}

