// @ts-nocheck
import { ToastAndroid } from 'react-native';
import IntentLauncher from '@angelkrak/react-native-intent-launcher';

/**
 * Parameters for launching an Android intent.
 */
export type IntentParams = {
  action: string;
  data?: string;
  type?: string;
  category?: string;
  flags?: number;
  extra?: Record<string, any>;
  packageName?: string;
  className?: string;
};

/**
 * An intent can be a string (action) or an object with full parameters.
 */
export type IntentItem = string | IntentParams;

/**
 * Class for launching intents on Android from a React Native application.
 */
export class IntentLauncherClass {
  /**
   * Starts a new activity with the specified parameters.
   * @param params Parameters to configure the intent.
   */
  static async startActivity(params: IntentParams): Promise<void> {
    try {
      await IntentLauncher.startActivity(params);
    } catch (error: any) {
      throw new Error('Error launching activity: ' + error?.message || error);
    }
  }

  /**
   * Checks if an app with the specified package name is installed.
   * @param packageName Application package name.
   */
  static async isAppInstalled(packageName: string): Promise<boolean> {
    try {
      return await IntentLauncher.isAppInstalled(packageName);
    } catch (error: any) {
      throw new Error('Error checking app installation: ' + error?.message || error);
    }
  }

  /**
   * Launches an application by its package name.
   * @param packageName Package name of the app.
   */
  static async startAppByPackageName(packageName: string): Promise<boolean> {
    try {
      const launched = await IntentLauncher.startAppByPackageName(packageName);
      if (!launched) throw new Error('App could not be launched');
      return launched;
    } catch (error: any) {
      throw new Error('Error launching app by package name: ' + error?.message || error);
    }
  }

  /**
   * Launches a series of intents sequentially. Shows a toast if none succeed.
   * @param intents Array of intents (string or object) to launch.
   */
  static async launchIntents(intents: IntentItem[]): Promise<void> {
    let intentLaunched = false;

    for (const intentItem of intents) {
      if (!intentItem) continue;

      try {
        if (typeof intentItem === 'string') {
          await IntentLauncher.startActivity({ action: intentItem });
        } else {
          await IntentLauncher.startActivity(intentItem);
        }
        intentLaunched = true;
        break;
      } catch (error) {
        console.error('Error launching intent:', error);
      }
    }

    if (!intentLaunched) {
      ToastAndroid.show(
        'Device not supported or action not available',
        ToastAndroid.LONG
      );
    }
  }
}

export default IntentLauncherClass;
