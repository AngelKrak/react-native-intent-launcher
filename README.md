# react-native-intent-launcher  
[![version](https://img.shields.io/npm/v/@angelkrak/react-native-intent-launcher.svg)](https://www.npmjs.com/package/@angelkrak/react-native-intent-launcher) [![downloads](https://img.shields.io/npm/dm/@angelkrak/react-native-intent-launcher.svg?style=flat)](https://www.npmjs.com/package/@angelkrak/react-native-intent-launcher)
[![downloads](https://img.shields.io/npm/dt/@angelkrak/react-native-intent-launcher.svg?style=flat)](https://www.npmjs.com/package/@angelkrak/react-native-intent-launcher)  

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

// Ejemplo de cómo lanzar una actividad
const params = {
  action: 'android.settings.APPLICATION_DETAILS_SETTINGS',
  data: 'package:com.example'
};
IntentLauncherClass.startActivity(params);

// Ejemplo de cómo lanzar una serie de intents secuencialmente
const intents = [
  { action: 'android.settings.APPLICATION_DETAILS_SETTINGS', data: 'package:com.example' },
  action: 'android.intent.action.VIEW',
  packageName: 'com.android.settings',
  className: 'com.android.settings.InstalledAppDetails',
  extra: {
    'com.android.settings.ApplicationPkgName': "com.example",
    'pkg': "com.example"
  },
  'android.settings.MANAGE_APPLICATIONS_SETTINGS',
  'android.provider.Settings.ACTION_SETTINGS',
];
IntentLauncherClass.launchIntents(intents);

// Ejemplo de cómo verificar si una aplicación está instalada
const packageName = 'com.android.chrome'; // Paquete de la aplicación Chrome
IntentLauncherClass.isAppInstalled(packageName)
  .then((result) => {
    console.log('La aplicación está instalada');
  })
  .catch((error) => {
    console.warn('La aplicación no está instalada', error);
  });

// Ejemplo de cómo iniciar otra aplicación por su nombre de paquete
const packageNameToStart = 'com.android.chrome'; // Paquete de la aplicación Chrome
IntentLauncherClass.startAppByPackageName(packageNameToStart)
  .then((result) => {
    console.log('La aplicación se ha iniciado');
  })
  .catch((error) => {
    console.warn('No se pudo iniciar la aplicación', error);
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