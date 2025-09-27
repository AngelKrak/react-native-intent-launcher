// @ts-nocheck
import { NativeModules } from 'react-native';
import * as IntentConstants from "./IntentConstants";
import IntentLauncherClass from './IntentLauncherClass';

const { IntentLauncher } = NativeModules;

export default IntentLauncher as typeof NativeModules.IntentLauncher;

export {
  IntentConstants,
  IntentLauncherClass,
};
