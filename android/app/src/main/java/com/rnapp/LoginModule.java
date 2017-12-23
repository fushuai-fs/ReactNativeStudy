package com.rnapp;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.widget.Toast;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

/**
 * Created by FUSHUAI on 2017/12/23.
 */

public class LoginModule extends ReactContextBaseJavaModule {
    /**
     * @return the name of this module. This will be the name used to {@code require()} this module
     * from javascript.
     */
    @Override
    public String getName() {
        return "LoginModule";
    }
    SQLiteHelper myHelper;
    private Context context;
    public LoginModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.context = reactContext;
        myHelper = new SQLiteHelper(reactContext);
    }
    @ReactMethod
    public  void login(String Supplier,String UserName,String Password)
    {
        try
        {
            SQLiteDatabase db = myHelper.getWritableDatabase();
            ContentValues content = new ContentValues();
            content.put("Supplier", Supplier);
            content.put("UserName", UserName);
            content.put("Password", Password);
            content.put("Status", 1);
            db.insert("account", null, content);
            db.close();
        }catch (Exception e)
        {
            Toast.makeText(context,"login"+e.toString(),Toast.LENGTH_SHORT).show();
        }
    }
    @ReactMethod
    public  void  exitLogin(){

        SQLiteDatabase db = myHelper.getWritableDatabase();
        db.delete("account","Status",new String[]{"1"});
        db.close();
    }

    @ReactMethod
    public void checkLogin(Callback errorCallback, Callback successCallback) {

        Boolean isLogin = false;
        String Supplier="";String UserName=""; String Password="";
        try {
            SQLiteDatabase db = myHelper.getWritableDatabase();
            Cursor cursor = db.query("account", new String[]{"Supplier","UserName","Password"}, "Status=?", new String[]{"1"}, null, null, null);
            if (cursor != null && cursor.getCount() != 0) {
                cursor.moveToNext();
                isLogin=true;
                //根据列名获取列索引

                int SupplierIndex = cursor.getColumnIndex("Supplier");
                Supplier=cursor.getString(SupplierIndex);
                int UserNameIndex =cursor.getColumnIndex("UserName");
                UserName=cursor.getString(UserNameIndex);
                int PasswordIndex =cursor.getColumnIndex("Password");
                Password=cursor.getString(PasswordIndex);
               db.delete("account","Status",new String[]{"1"});
//                Toast.makeText(context,"Supplier="+Supplier+"；UserName="+UserName,Toast.LENGTH_SHORT).show();

            }
            successCallback.invoke(isLogin,Supplier,UserName,Password);
        } catch (Exception e) {
            errorCallback.invoke(isLogin,e.getMessage());
        }
//        Toast.makeText(context,"login",Toast.LENGTH_SHORT).show();
    }
}
