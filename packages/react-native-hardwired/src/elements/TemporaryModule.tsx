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
import { reportError } from "../errors";
import { constructTemporarySource } from "../utils/constructTemporarySource";
import { useSource } from "../utils/useSource";
import { generateName } from "../utils/generateName";
import { loadDependencies } from "../utils/loadDependencies";

/**
 * Module is temporary, meaning it will be loaded only in given JSX object. It'll not persist in global scope.
 * Loads dependencies, registers module in global scope and returns module.
 * Temporary Module does not persist in memory, by design it should not increase memory usage (to be tested ;))
 * @param source    Method that returns source code, source code object, or string containing source code
 If object is provided, it needs to contain code property and dependencies property (if you want to load dependencies first).
 Consult documentation and transpilation package for more information.
 * @param children
 * @param args      Module's props
 * @constructor
 */
export const TemporaryModule = ({
  source,
  args,
}: HardwiredLoadType): JSX.Element => {
  const context = useContext(getContext());
  const [effectiveName] = useState(generateName(context));
  const hash = requireModule(context, effectiveName);
  const [module, setModule] = useState<Object | null>(null);
  const [requireArgs, setRequireArgs] = useState<any>(null);
  const sourceCode = useSource(source);

  /**
   * Catch __r arguments for later use
   */
  useEffect(() => {
    global[context.defineModuleName](
      function () {
        setRequireArgs(arguments);
      },
      111,
      []
    );
    context.runModuleStatement(111);
  }, [context]);

  /**
   * Read the source code & prepare it
   */
  useEffect(() => {
    setImmediate(async () => {
      if (!requireArgs) {
        return;
      }

      if (!sourceCode || sourceCode.code.length === 0) {
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

      const sourcePrepared = constructTemporarySource(sourceCode);

      const evaluated = evaluate(sourcePrepared);

      // replacing catched arguments for runModuleStatement
      requireArgs[6] /* _dependencyMap */ = dependencyIds;
      requireArgs[5] /* exports */ = {};
      evaluated(...requireArgs);

      const evaluatedObject = { evaluated: requireArgs[5] };

      if (
        evaluatedObject.evaluated &&
        typeof evaluatedObject.evaluated.default !== "undefined"
      ) {
        setModule(evaluatedObject);
      } else {
        reportError("Hardwired: Temporary code evaluation failed");
      }
    });
  }, [sourceCode, effectiveName, requireArgs, context, hash]);

  if (
    !module ||
    typeof module.evaluated === "undefined" ||
    typeof module.evaluated.default !== "function"
  ) {
    return <></>;
  }

  return module.evaluated.default(args);
};

export default { TemporaryModule };
