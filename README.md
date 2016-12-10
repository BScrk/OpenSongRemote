OpenSongRemote Ionic Mobile App (Work in Progress)
=====================
Remote mobile app for Open Song (2.1+)

## Open Song

### Official website 
http://www.opensong.org/

### API
http://www.opensong.org/home/api

## Install

```bash
$ npm install -g cordova ionic
$ npm install
```

## Launch

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

### iOS

Install platform support (if needed)
```bash
$ cordova platform add android
$ ionic platform android
```

Build & run
```bash
$ ionic build ios
```
Then launch xcode, open project ./platforms/ios/OpenSongRemote.xcodeproj and click Play
