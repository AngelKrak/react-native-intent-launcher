# React Native Intent Launcher
[![npm version](https://badge.fury.io/js/@angelkrak%2Freact-native-intent-launcher.svg)](https://badge.fury.io/js/@angelkrak%2Freact-native-intent-launcher) [![downloads](https://img.shields.io/npm/dt/@angelkrak/react-native-intent-launcher.svg)](https://npmcharts.com/compare/@angelkrak/react-native-intent-launcher?minimal=true) ![MIT](https://img.shields.io/dub/l/vibe-d.svg) ![Platform - Android](https://img.shields.io/badge/platforms-android-lightgrey.svg)

call native function `startActivity` in react-native

## Description
You can call native function `startActivity` in react-native to do something with `Intent` which can only be solved with android native code

## Installation

1. `npm install @angelkrak/react-native-intent-launcher` 
2. `react-native link @angelkrak/react-native-intent-launcher`

## Usage
```javascript
import IntentLauncher from '@angelkrak/react-native-intent-launcher';

IntentLauncher.startActivity({
	action: 'android.settings.APPLICATION_DETAILS_SETTINGS',
	data: 'package:com.example'
})

// check if app is installed by package name
IntentLauncher.isAppInstalled('com.android.chrome')
  .then((result) => {
    console.log('isAppInstalled yes');
  })
  .catch((error) => console.warn('isAppInstalled: no', error));

// open another app by package name
IntentLauncher.startAppByPackageName('com.android.chrome')
  .then((result) => {
    console.log('startAppByPackageName started');
  })
  .catch((error) => console.warn('startAppByPackageName: could not open', error));
```

## Usage with IntentLauncherClass.js
You can also use IntentLauncherClass.js directly in your project. Here's how to import and use it:

```javascript
import { IntentLauncherClass } from '@angelkrak/react-native-intent-launcher'; 

// Example of how to launch an activity
const params = {
  action: 'android.settings.APPLICATION_DETAILS_SETTINGS',
  data: 'package:com.example'
};
IntentLauncherClass.startActivity(params);

// Example of how to launch a series of intents sequentially
const intents = [
  { action: 'android.settings.APPLICATION_DETAILS_SETTINGS', data: 'package:com.example' },
  {
    action: 'android.intent.action.VIEW',
    packageName: 'com.android.settings',
    className: 'com.android.settings.InstalledAppDetails',
    extra: {
      'com.android.settings.ApplicationPkgName': "com.example",
      'pkg': "com.example"
    }
  },
  'android.settings.MANAGE_APPLICATIONS_SETTINGS',
  'android.provider.Settings.ACTION_SETTINGS',
];
IntentLauncherClass.launchIntents(intents);

// Example of how to check if an application is installed
const packageName = 'com.android.chrome'; // Chrome application package
IntentLauncherClass.isAppInstalled(packageName)
  .then((result) => {
    console.log('The application is installed');
  })
  .catch((error) => {
    console.warn('The application is not installed', error);
  });

// Example of how to start another application by its package name
const packageName = 'com.android.chrome'; // Chrome application package
IntentLauncherClass.startAppByPackageName(packageName)
  .then((result) => {
    console.log('The application has been started');
  })
  .catch((error) => {
    console.warn('Failed to start the application', error);
  });
```

## Properties
* `action` String
* `data` String
* `category` String
* `flags` String
* `extra` Object
* `packageName` String
* `className` String
* `flags` Number

In the `IntentConstant`, we provide some constants for these properties, you can look up document provided by google to find out property we didn't support currently.

## License
*MIT*