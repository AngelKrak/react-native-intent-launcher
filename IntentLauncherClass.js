import { ToastAndroid } from 'react-native';
import IntentLauncher from '@angelkrak/react-native-intent-launcher';

/**
 * Class for launching intents on Android from a React Native application.
 */
class IntentLauncherClass {
  constructor() {
    return this;
  }

  /**
   * Starts a new activity with the specified parameters.
   * @param {object} params - Parameters to configure the intent.
   * @param {string} params.action - Intent action.
   * @param {string} [params.data] - Intent data.
   * @param {string} [params.type] - Intent type.
   * @param {string} [params.category] - Intent category.
   * @param {number} [params.flags] - Intent flags.
   * @param {object} [params.extra] - Intent extras.
   * @param {string} [params.packageName] - Activity package name.
   * @param {string} [params.className] - Activity class name.
   * @returns {Promise<void>} A promise that resolves when the intent launching is completed.
   * @example
   * const params = {
   *   action: 'android.intent.action.VIEW',
   *   data: 'https://www.example.com',
   *   type: 'text/plain',
   *   flags: 0
   * };
   * await IntentLauncherClass.startActivity(params);
   */
  static async startActivity(params) {
    try {
      await IntentLauncher.startActivity(params);
    } catch (error) {
      throw new Error('Error launching activity: ' + error);
    }
  }

  /**
   * Checks if an app with the specified package name is installed on the device.
   * @param {string} packageName - Application package name.
   * @returns {Promise<boolean>} A promise that resolves with true if the app is installed, otherwise rejects.
   * @example
   * try {
   *   const installed = await IntentLauncherClass.isAppInstalled('com.example.app');
   *   if (installed) {
   *     console.log('The app is installed');
   *   } else {
   *     console.log('The app is not installed');
   *   }
   * } catch (error) {
   *   console.error('Error checking app installation:', error);
   * }
   */
  static async isAppInstalled(packageName) {
    try {
      return await IntentLauncher.isAppInstalled(packageName);
    } catch (error) {
      throw new Error('Error checking app installation: ' + error);
    }
  }

  /**
   * Launches an application by its package name.
   * @param {string} packageName - Package name of the application to be launched.
   * @returns {Promise<boolean>} A promise that resolves with true if the application is launched successfully, otherwise rejects.
   * @example
   * try {
   *   await IntentLauncherClass.startAppByPackageName('com.example.app');
   *   console.log('App launched successfully');
   * } catch (error) {
   *   console.error('Error launching app by package name:', error);
   * }
   */
  static async startAppByPackageName(packageName) {
    try {
      await IntentLauncher.startAppByPackageName(packageName);
    } catch (error) {
      throw new Error('Error launching app by package name: ' + error);
    }
  }

  /**
   * Function to launch a series of intents sequentially and show a message if none of them are launched successfully.
   * @param {(string | { action: string, data?: string, type?: string, category?: string, flags?: string, extra?: object, packageName?: string, className?: string })[]} intents - Array of intents to launch. Can be a string or an object with intent properties.
   * @returns {Promise<void>} A promise that resolves when the intents launching is completed.
   * @example
   * const intents = [
   *   'android.settings.WIFI_DISPLAY_SETTINGS',
   *   { action: 'android.settings.APPLICATION_DETAILS_SETTINGS', data: 'package:com.example' },
   *   'android.settings.CAST_SETTINGS',
   * ];
   * IntentLauncherClass.launchIntents(intents);
   */
  static async launchIntents(intents) {
    let intentLaunched = false;

    for (const intentItem of intents) {
      try {
        if (typeof intentItem === 'string') {
          await IntentLauncher.startActivity({ action: intentItem });
        } else {
          await IntentLauncher.startActivity(intentItem);
        }

        intentLaunched = true;
        break; // If an intent is successfully launched, stop the loop
      } catch (error) {
        console.error('Error launching intent:', error);
      }
    }

    if (!intentLaunched) {
      ToastAndroid.show('Device not supported or action not available', ToastAndroid.LONG);
    }
  }
}

export default IntentLauncherClass;