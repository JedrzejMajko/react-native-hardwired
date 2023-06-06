import { ReactNode } from "react";

export {};

declare global {
  var __DEV__: bool;
  var __r: CallableFunction;
  var ErrorUtils: any; // @TEMP
}

type HashingMethod = (path: string) => number;

interface LoadedModulesType {
  [key: string]: number;
}

export interface ModuleType {
  default: Function;
}

export interface Dependency {
  hashes: number[]; // list of hashes to use in order of preference
  names?: string[]; // list of names for hashes (optional)
}

export interface Config {
  //root: string?;
  //ctx: React.Context<HardwiredContextType>;
  runModuleStatement: CallableFunction;
  defineModuleName: String;
  internalNaming: Generator<string>;
  loadedModules: LoadedModulesType;
}

export interface UserConfig extends Config {
  //ctx?: React.Context<HardwiredContextType>;
  runModuleStatement?: CallableFunction;
  defineModuleName?: String;
  internalNaming?: Generator<string>;
  loadedModules?: LoadedModulesType;
}

export interface HardwiredDependency {
  hashes: number[];
  names: string[];
}

export interface HardwiredSourceObject {
  code: string;
  dependencies?: HardwiredDependency[];
}

export interface HardwiredLoadType {
  children?: ReactNode;
  name?: string;
  source: Function | string | object;
  args: any; // @FIXME change to definition of arguments
}

export interface HardwiredContextType {
  allowedRequirements?: string[];
  loadedModules: LoadedModulesType;
}

export interface HardwiredRequireType {
  children?: ReactNode;
  name: string | null;
  hash: number | null;
  args?: any; // it can be any type that will be passed to the props
}

export interface HardwiredProviderType {
  children?: ReactNode;
  config?: Config;
  allowedRequirements?: string[];
}
