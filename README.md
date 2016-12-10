OpenSongRemote Ionic Mobile App (Work in Progress)
=====================
Remote mobile app for Open Song (2.1+)

## Open Song

##### Official website 
http://www.opensong.org/

##### API
http://www.opensong.org/home/api

## Install

```bash
$ npm install -g cordova ionic
$ npm install
```

## Launch (dev mode)

```bash
$ ionic serve --lab
```

## Build & run

### Android 

Install platform support (if needed)
```bash
$ cordova platform add android
$ ionic platform android
```

Build & run
```bash
$ ionic build android
$ ionic run android
```

#### Android Issues 

##### No internet issue ? (connection failed) 
1 - Run the following command
```bash
$ cordova plugin add cordova-plugin-whitelist
```
2 - Also make sure you have the following in your Android manifest...
```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
<uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />
 ```


### iOS

Install platform support (if needed)
```bash
$ cordova platform add ios
$ ionic platform ios
```

Build & run
```bash
$ ionic build ios
```
Then launch xcode, open project ./platforms/ios/OpenSongRemote.xcodeproj and click Play
