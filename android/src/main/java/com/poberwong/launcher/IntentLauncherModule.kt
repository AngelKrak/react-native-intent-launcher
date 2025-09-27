package com.poberwong.launcher

import android.app.Activity
import android.content.ComponentName
import android.content.Intent
import android.content.pm.PackageManager
import android.net.Uri
import com.facebook.react.bridge.ActivityEventListener
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableMap

class IntentLauncherModule(private val reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext), ActivityEventListener {

    companion object {
        private const val REQUEST_CODE = 12
        private const val ATTR_ACTION = "action"
        private const val ATTR_TYPE = "type"
        private const val ATTR_CATEGORY = "category"
        private const val TAG_EXTRA = "extra"
        private const val ATTR_DATA = "data"
        private const val ATTR_FLAGS = "flags"
        private const val ATTR_PACKAGE_NAME = "packageName"
        private const val ATTR_CLASS_NAME = "className"
    }

    private var promise: Promise? = null

    init {
        reactContext.addActivityEventListener(this)
    }

    override fun getName(): String = "IntentLauncher"

    @ReactMethod
    fun startActivity(params: ReadableMap, promise: Promise) {
        this.promise = promise
        val intent = Intent()

        if (params.hasKey(ATTR_CLASS_NAME)) {
            val className = params.getString(ATTR_CLASS_NAME)
            if (className == null) {
                promise.reject("CLASS_NAME_MISSING", "Class name missing")
                return
            }

            val cn = if (params.hasKey(ATTR_PACKAGE_NAME)) {
                val packageName = params.getString(ATTR_PACKAGE_NAME)
                if (packageName == null) {
                    promise.reject("PACKAGE_NAME_MISSING", "Package name missing")
                    return
                }
                ComponentName(packageName, className)
            } else {
                ComponentName(reactContext, className)
            }
            intent.component = cn
        }

        params.getString(ATTR_ACTION)?.let { intent.action = it }
        val data = params.getString(ATTR_DATA)
        val type = params.getString(ATTR_TYPE)
        if (data != null && type != null) {
            intent.setDataAndType(Uri.parse(data), type)
        } else {
            data?.let { intent.data = Uri.parse(it) }
            type?.let { intent.type = it }
        }

        // Extras null-safe
        params.getMap(TAG_EXTRA)?.let { extras ->
            Arguments.toBundle(extras)?.let { intent.putExtras(it) }
        }

        // Flags
        if (params.hasKey(ATTR_FLAGS)) {
            intent.addFlags(params.getInt(ATTR_FLAGS))
        }

        // Category
        params.getString(ATTR_CATEGORY)?.let { intent.addCategory(it) }

        // Lanzamiento de activity
        reactContext.currentActivity?.startActivityForResult(intent, REQUEST_CODE, null)
            ?: promise.reject("NO_ACTIVITY", "Current activity is null")
    }

    @ReactMethod
    fun isAppInstalled(packageName: String, promise: Promise) {
        try {
            reactContext.packageManager.getPackageInfo(packageName, 0)
            promise.resolve(true)
        } catch (e: PackageManager.NameNotFoundException) {
            promise.reject("APP_NOT_FOUND", "App not found: $packageName")
        }
    }

    @ReactMethod
    fun startAppByPackageName(packageName: String, promise: Promise) {
        if (packageName.isEmpty()) {
            promise.reject("PACKAGE_NAME_MISSING", "Package name missing")
            return
        }
        val launchIntent = reactContext.packageManager.getLaunchIntentForPackage(packageName)
        if (launchIntent != null) {
            reactContext.startActivity(launchIntent)
            promise.resolve(true)
        } else {
            promise.reject("CANNOT_START_APP", "Could not start app: $packageName")
        }
    }

    override fun onNewIntent(intent: Intent) {
        // No-op
    }

    override fun onActivityResult(
        activity: Activity,
        requestCode: Int,
        resultCode: Int,
        data: Intent?
    ) {
        if (requestCode != REQUEST_CODE) return

        val params = Arguments.createMap()
        if (data != null) {
            params.putInt("resultCode", resultCode)
            data.data?.let { params.putString("data", it.toString()) }
            data.extras?.let { params.putMap("extra", Arguments.fromBundle(it)) }
        }
        promise?.resolve(params)
        promise = null
    }
}