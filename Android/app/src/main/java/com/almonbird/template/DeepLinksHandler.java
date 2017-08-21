package com.almonbird.template;

import org.json.JSONException;
import org.json.JSONObject;

/**
 * Created by tonyhaddad on 05/11/2016.
 */

public class DeepLinksHandler {
    private static DeepLinksHandler deepLinkingParser;
    private MainActivity mainActivity;

    private DeepLinksHandler() {
    }

    public static DeepLinksHandler getInstance() {
        if (deepLinkingParser == null) {
            deepLinkingParser = new DeepLinksHandler();
        }
        return deepLinkingParser;
    }

    public void handleLink(String url, MainActivity mainActivity) {
        if (android.text.TextUtils.isEmpty(url) || mainActivity == null)
            return;

        this.mainActivity = mainActivity;
        String data = Utils.readAsset(mainActivity.getAssets(), "Config.json");
        JSONObject jsonObject = null;
        try {
            jsonObject = new JSONObject(data);
        } catch (JSONException e) {
            e.printStackTrace();
        }
        String URL = "";
        if (url.contains(mainActivity.getString(R.string.action_open))) {
            if (url.contains("path")) {
                try {
                    URL = jsonObject.getString("websiteURL") + url.substring(url.indexOf("path=") + 5);
                    mainActivity.loadUrl(URL);
                    return;
                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }
        }


    }
}
