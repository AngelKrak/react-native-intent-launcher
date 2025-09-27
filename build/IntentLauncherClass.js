"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntentLauncherClass = void 0;
// @ts-nocheck
const react_native_1 = require("react-native");
const react_native_intent_launcher_1 = __importDefault(require("@angelkrak/react-native-intent-launcher"));
/**
 * Class for launching intents on Android from a React Native application.
 */
class IntentLauncherClass {
    /**
     * Starts a new activity with the specified parameters.
     * @param params Parameters to configure the intent.
     */
    static async startActivity(params) {
        try {
            await react_native_intent_launcher_1.default.startActivity(params);
        }
        catch (error) {
            throw new Error('Error launching activity: ' + (error === null || error === void 0 ? void 0 : error.message) || error);
        }
    }
    /**
     * Checks if an app with the specified package name is installed.
     * @param packageName Application package name.
     */
    static async isAppInstalled(packageName) {
        try {
            return await react_native_intent_launcher_1.default.isAppInstalled(packageName);
        }
        catch (error) {
            throw new Error('Error checking app installation: ' + (error === null || error === void 0 ? void 0 : error.message) || error);
        }
    }
    /**
     * Launches an application by its package name.
     * @param packageName Package name of the app.
     */
    static async startAppByPackageName(packageName) {
        try {
            const launched = await react_native_intent_launcher_1.default.startAppByPackageName(packageName);
            if (!launched)
                throw new Error('App could not be launched');
            return launched;
        }
        catch (error) {
            throw new Error('Error launching app by package name: ' + (error === null || error === void 0 ? void 0 : error.message) || error);
        }
    }
    /**
     * Launches a series of intents sequentially. Shows a toast if none succeed.
     * @param intents Array of intents (string or object) to launch.
     */
    static async launchIntents(intents) {
        let intentLaunched = false;
        for (const intentItem of intents) {
            if (!intentItem)
                continue;
            try {
                if (typeof intentItem === 'string') {
                    await react_native_intent_launcher_1.default.startActivity({ action: intentItem });
                }
                else {
                    await react_native_intent_launcher_1.default.startActivity(intentItem);
                }
                intentLaunched = true;
                break;
            }
            catch (error) {
                console.error('Error launching intent:', error);
            }
        }
        if (!intentLaunched) {
            react_native_1.ToastAndroid.show('Device not supported or action not available', react_native_1.ToastAndroid.LONG);
        }
    }
}
exports.IntentLauncherClass = IntentLauncherClass;
exports.default = IntentLauncherClass;
