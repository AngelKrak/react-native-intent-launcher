import { NativeModules } from 'react-native';
import * as IntentConstants from './IntentConstants';
import IntentLauncherClass from './IntentLauncherClass';

export type IntentLauncherType = typeof NativeModules.IntentLauncher;

declare const IntentLauncher: IntentLauncherType;

export default IntentLauncher;
export { IntentConstants, IntentLauncherClass };