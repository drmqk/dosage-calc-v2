#!/usr/bin/env bash
set -e

echo "=== Building Dosage Calc Standalone Android APK ==="

WORK_DIR="/tmp/apk-build"
rm -rf "$WORK_DIR"
mkdir -p "$WORK_DIR/src/com/radcontrast/dosagecalc"
mkdir -p "$WORK_DIR/gen"
mkdir -p "$WORK_DIR/bin"
mkdir -p "$WORK_DIR/res/drawable"
mkdir -p "$WORK_DIR/res/drawable-hdpi"
mkdir -p "$WORK_DIR/res/drawable-mdpi"
mkdir -p "$WORK_DIR/res/drawable-xhdpi"
mkdir -p "$WORK_DIR/res/drawable-xxhdpi"
mkdir -p "$WORK_DIR/res/values"

# 1. Copy Icons
cp public/pwa-192x192.png "$WORK_DIR/res/drawable-mdpi/ic_launcher.png"
cp public/pwa-192x192.png "$WORK_DIR/res/drawable-hdpi/ic_launcher.png"
cp public/pwa-512x512.png "$WORK_DIR/res/drawable-xhdpi/ic_launcher.png"
cp public/pwa-512x512.png "$WORK_DIR/res/drawable-xxhdpi/ic_launcher.png"
cp public/pwa-192x192.png "$WORK_DIR/res/drawable/ic_launcher.png"

# 2. Create strings.xml
cat << 'EOF' > "$WORK_DIR/res/values/strings.xml"
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <string name="app_name">Dosage Calc</string>
</resources>
EOF

# 3. Create AndroidManifest.xml
cat << 'EOF' > "$WORK_DIR/AndroidManifest.xml"
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.radcontrast.dosagecalc"
    android:versionCode="1"
    android:versionName="1.0.0">

    <uses-sdk android:minSdkVersion="21" android:targetSdkVersion="33" />
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />

    <application
        android:label="@string/app_name"
        android:icon="@drawable/ic_launcher"
        android:hardwareAccelerated="true"
        android:usesCleartextTraffic="true">
        <activity
            android:name=".MainActivity"
            android:label="@string/app_name"
            android:configChanges="orientation|screenSize|keyboardHidden"
            android:theme="@android:style/Theme.NoTitleBar.Fullscreen"
            android:exported="true">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>
</manifest>
EOF

# 4. Create MainActivity.java
cat << 'EOF' > "$WORK_DIR/src/com/radcontrast/dosagecalc/MainActivity.java"
package com.radcontrast.dosagecalc;

import android.app.Activity;
import android.os.Bundle;
import android.view.KeyEvent;
import android.view.Window;
import android.view.WindowManager;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

public class MainActivity extends Activity {
    private WebView webView;
    private static final String APP_URL = "https://ais-pre-xmnmqid7joxexqdgzcpoap-565632373285.europe-west3.run.app";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        requestWindowFeature(Window.FEATURE_NO_TITLE);
        getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN, WindowManager.LayoutParams.FLAG_FULLSCREEN);

        webView = new WebView(this);
        setContentView(webView);

        WebSettings settings = webView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setDatabaseEnabled(true);
        settings.setLoadWithOverviewMode(true);
        settings.setUseWideViewPort(true);
        settings.setSupportZoom(false);
        settings.setBuiltInZoomControls(false);
        settings.setCacheMode(WebSettings.LOAD_DEFAULT);

        webView.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, String url) {
                view.loadUrl(url);
                return true;
            }
        });

        webView.loadUrl(APP_URL);
    }

    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {
        if ((keyCode == KeyEvent.KEYCODE_BACK) && webView.canGoBack()) {
            webView.goBack();
            return true;
        }
        return super.onKeyDown(keyCode, event);
    }
}
EOF

# 5. Generate R.java with AAPT
echo "[1/6] Running AAPT to generate R.java..."
aapt package -m -J "$WORK_DIR/gen" -M "$WORK_DIR/AndroidManifest.xml" -S "$WORK_DIR/res" -I /tmp/android.jar

# 6. Compile Java sources with javac
echo "[2/6] Compiling Java classes with javac..."
javac -source 1.8 -target 1.8 \
  -bootclasspath /tmp/android.jar \
  -cp /tmp/android.jar \
  -d "$WORK_DIR/bin" \
  "$WORK_DIR/src/com/radcontrast/dosagecalc/MainActivity.java" \
  "$WORK_DIR/gen/com/radcontrast/dosagecalc/R.java"

# 7. Convert classes to Dalvik DEX format with dalvik-exchange (dx)
echo "[3/6] Packaging classes.dex with dalvik-exchange..."
/usr/bin/dalvik-exchange --dex --output="$WORK_DIR/bin/classes.dex" "$WORK_DIR/bin"

# 8. Package APK resources with AAPT
echo "[4/6] Creating initial APK package..."
aapt package -f \
  -M "$WORK_DIR/AndroidManifest.xml" \
  -S "$WORK_DIR/res" \
  -I /tmp/android.jar \
  -F "$WORK_DIR/bin/unsigned.apk"

cd "$WORK_DIR/bin"
aapt add unsigned.apk classes.dex
cd - > /dev/null

# 9. 4-Byte ZipAlign
echo "[5/6] Aligning APK with zipalign..."
zipalign -v -p 4 "$WORK_DIR/bin/unsigned.apk" "$WORK_DIR/bin/aligned.apk" > /dev/null

# 10. Generate Keystore and Sign APK
echo "[6/6] Generating keystore and signing APK..."
KEYSTORE="$WORK_DIR/release.jks"
rm -f "$KEYSTORE"
keytool -genkeypair -v \
  -keystore "$KEYSTORE" \
  -alias dosagecalc \
  -keyalg RSA \
  -keysize 2048 \
  -validity 10000 \
  -storepass password123 \
  -keypass password123 \
  -dname "CN=DosageCalc, OU=Radiology, O=RadContrast, L=Clinical, ST=State, C=US"

mkdir -p public
apksigner sign \
  --ks "$KEYSTORE" \
  --ks-pass pass:password123 \
  --key-pass pass:password123 \
  --out public/dosage-calc.apk \
  "$WORK_DIR/bin/aligned.apk"

# Verify signature
echo "Verifying APK signature..."
apksigner verify -v public/dosage-calc.apk

echo "SUCCESS: Standalone Android APK created at public/dosage-calc.apk"
ls -lh public/dosage-calc.apk
