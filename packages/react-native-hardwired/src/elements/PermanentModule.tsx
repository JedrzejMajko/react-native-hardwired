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

import { HardwiredLoadType } from "../types/index";
import { getContext } from "../config";
import { requireModule } from "../utils/requireModule";
import { evaluate } from "../utils/evaluate";
import { registerHash } from "../utils/hashManagement";
import { RequireModule } from "./RequireModule";
import { reportError } from "../errors";
import { constructSource } from "../utils/constructSource";
import { useSource } from "../utils/useSource";
import { generateName } from "../utils/generateName";
import { loadDependencies } from "../utils/loadDependencies";

/**
 * Module is persistent, meaning it will be loaded only once and will be available in global scope.
 * Loads dependencies, registers module in global scope and returns module.
 * Loading the same module name again will not cause a reload of it's content (first code will persist).
 * @param source    Method that returns source code, source code object, or string containing source code
                    If object is provided, it needs to contain code property and dependencies property (if you want to load dependencies first).
                    Consult documentation and transpilation package for more information.
 * @param name      Module's name
 * @param children
 * @param args      Module's props
 * @constructor
 */
export const PermanentModule = ({
  source,
  name,
  children,
  args,
}: HardwiredLoadType): JSX.Element => {
  const context = useContext(getContext());
  const [effectiveName] = useState(name || generateName(context));
  const hash = requireModule(context, effectiveName);
  const [module, setModule] = useState<number | null>(null);
  const sourceCode = useSource(source);

  useEffect(() => {
    setImmediate(async () => {
      if (!sourceCode) {
        reportError("No source code loaded");
        return;
      }

      let dependencyIds: number[] = [];

      if (sourceCode.dependencies) {
        dependencyIds = await loadDependencies(
          sourceCode.dependencies,
          context
        );
        if (dependencyIds.length === 0) {
          reportError("Cannot proceed without dependency resolution");
          return;
        }
      }

      if (!effectiveName) {
        reportError("Cannot proceed without name");
        return;
      }

      if (!hash) {
        reportError("Cannot proceed without hash");
        return;
      }

      const sourceX = constructSource(sourceCode, hash, dependencyIds, context);

      if (evaluate(sourceX)) {
        registerHash(context, effectiveName, Number(hash));
        setModule(hash);
      } else {
        reportError("Hardwired: code evaluation failed");
      }
    });
  }, [effectiveName, context, hash, sourceCode]);

  if (!effectiveName || !module) {
    return <></>;
  }

  return (
    <RequireModule name={effectiveName} hash={module} args={args}>
      {children}
    </RequireModule>
  );
};

export default { PermanentModule };
