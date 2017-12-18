package com.upgrade;

import android.content.Context;
import android.widget.Toast;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by Song on 2017/7/10.
 */
public class UpgradeModule extends ReactContextBaseJavaModule {

    private Context context;
//    private boolean isUpgrade=false;
//    private  String apkUri="";
    public UpgradeModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.context = reactContext;
    }

    @Override
    public String getName() {
        return "UpgradeModule";
    }

    //要导出一个方法给JavaScript使用，Java方法需要使用注解@ReactMethod。方法的返回类型必须为void.React Native的跨语言访问是异步进行的，所以想要给JavaScript返回一个值的唯一办法是使用回调函数或者发送事件
    @ReactMethod
    public void upgrade(String apkUrl) {
        UpdateDialog.goToDownload(context, apkUrl);
    }


    // 查询是否更新
    @ReactMethod
    public void checkVersion(String version, Callback errorCallback,Callback successCallback) {
       String apkUri = "http://192.168.1.6/app-debug.apk";
       Boolean isUpgrade=true;
        try {
            successCallback.invoke(isUpgrade,apkUri);
        } catch (Exception e) {
            errorCallback.invoke(e.getMessage());
        }
    }
}
