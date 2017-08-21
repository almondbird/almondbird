package com.almonbird.template;

import android.content.Context;
import android.content.res.AssetManager;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by tonyhaddad on 23/09/2016.
 */

public class Utils {
    public static List<String> extensions = new ArrayList<String>() {{
        add(".jpg");
        add(".jpeg");
        add(".pdf");
        add(".gif");
        add(".css");
        add(".js");
        add(".png");
        add(".svg");
        add(".ttf");
        add(".otf");
        add(".woff");
        add(".woff2");
        add(".mp3");
        add(".wav");
    }};


    public static boolean isAssetExists(String pathInAssetsDir, Context context) {
        if (pathInAssetsDir != null && pathInAssetsDir.length() > 0) {
            AssetManager assetManager = context.getResources().getAssets();
            InputStream inputStream = null;
            try {
                inputStream = assetManager.open(pathInAssetsDir);
                if (null != inputStream) {
                    return true;
                }
            } catch (FileNotFoundException fnf) {
                fnf.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            } finally {
                try {
                    if (inputStream != null)
                        inputStream.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
        return false;
    }


    public static String readAsset(AssetManager mgr, String path) {
        String contents = "";
        InputStream is = null;
        BufferedReader reader = null;
        try {
            is = mgr.open(path);
            reader = new BufferedReader(new InputStreamReader(is));
            contents = reader.readLine();
            String line = null;
            while ((line = reader.readLine()) != null) {
                contents += '\n' + line;
            }
        } catch (final Exception e) {
            e.printStackTrace();
        } finally {
            if (is != null) {
                try {
                    is.close();
                } catch (IOException ignored) {
                }
            }
            if (reader != null) {
                try {
                    reader.close();
                } catch (IOException ignored) {
                }
            }
        }
        return contents;
    }
}
