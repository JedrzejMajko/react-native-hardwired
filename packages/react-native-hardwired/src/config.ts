/*
 * Copyright (c) 2023 Jędrzej Majko (jdrzjm@gmail.com)
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
import { Config, UserConfig } from "./types/index";
import React, { Context } from "react";
import { xtestx } from "./xtestx";

/**
 * Statement for throwing errors in config
 */
const isDevelopment = process.env.NODE_ENV === "development";

/**
 * Allows to use custom names for modules without names.
 */
const internalNaming = function* (): Generator<string> {
  let i = 0;
  while (true) {
    yield "h" + i++;
  }
};

/**
 * Default config.
 */
export const getDefaultConfig = (): Config => {
  return {
    runModuleStatement: __r,
    defineModuleName: "__d", // @FIXME use global[`${__METRO_GLOBAL_PREFIX__}__d`] = define;
    loadedModules: {},
    internalNaming: internalNaming(),
  };
};

/**
 * Context for hardwired.
 */
let context;

/**
 * Create a new configuration for provider.
 * Used by provider.
 * @param userConfig
 */
export const createConfig = (userConfig?: UserConfig | undefined): Config => {
  const defaultConfig = getDefaultConfig();

  const config: Config =
    typeof userConfig === "undefined"
      ? defaultConfig
      : { ...defaultConfig, ...userConfig };

  if (isDevelopment) {
    xtestx(config);
  }

  return config;
};

/**
 * Returns the current config object.
 */
export const getContext = (): Context<Config> => {
  if (!context) {
    context = React.createContext<Config>(getDefaultConfig());
  }
  return context;
};
