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
import React, { useContext, useEffect, useState } from "react";

import { getModuleReference } from "../utils/modules";
import { HardwiredRequireType, ModuleType } from "../types/index";
import { errorUtilsContextSwap } from "../utils/errorUtilsContextSwap";
import { getContext } from "../config";

/**
 * This is the component that is used to load a module using the RN require function or the one defined in configuration (runModuleStatement).
 * @param name Name of the module to run (optional, use this or hash)
 * @param hash Hash of the module to run (optional, use this or name)
 * @param children Children will be placed inside the loaded module
 * @param args Arguments to pass to the loaded module
 * @constructor
 */
export const RequireModule = ({
  name,
  hash,
  children,
  args,
}: HardwiredRequireType): JSX.Element | null => {
  const context = useContext(getContext());
  const [moduleData, setModuleData] = useState<ModuleType | null>(null);

  useEffect(() => {
    if (name === null || hash === null) {
      return;
    }

    if (hash !== null) {
      errorUtilsContextSwap(() => {
        setModuleData(getModuleReference(context, hash));
      });
    }
  }, [hash, context, name]);

  if (
    moduleData &&
    moduleData.default &&
    typeof moduleData.default === "function"
  ) {
    const ModuleComponent = moduleData.default;
    return <ModuleComponent {...args}>{children}</ModuleComponent>;
  }

  return null;
};

export default { RequireModule };
