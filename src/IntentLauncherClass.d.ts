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
export declare class IntentLauncherClass {
  /**
   * Starts a new activity with the specified parameters.
   * @param params Parameters to configure the intent.
   */
  static startActivity(params: IntentParams): Promise<void>;

  /**
   * Checks if an app with the specified package name is installed.
   * @param packageName Application package name.
   */
  static isAppInstalled(packageName: string): Promise<boolean>;

  /**
   * Launches an application by its package name.
   * @param packageName Package name of the app.
   */
  static startAppByPackageName(packageName: string): Promise<boolean>;

  /**
   * Launches a series of intents sequentially. Shows a toast if none succeed.
   * @param intents Array of intents (string or object) to launch.
   */
  static launchIntents(intents: IntentItem[]): Promise<void>;
}

export default IntentLauncherClass;