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
import {
  errorUtilsContextSwap,
  reinstateErrorUtils,
  suppressErrorUtils,
  customErrorUtilMethod,
} from "../../utils/errorUtilsContextSwap";

// @TODO Mock ErrorUtils

describe("Error Utils", () => {
  let originalReportFatalError: (error: object) => void;

  beforeEach(() => {
    originalReportFatalError = global.ErrorUtils?.reportFatalError;
  });

  afterEach(() => {
    reinstateErrorUtils(originalReportFatalError);
  });

  it("should suppress ErrorUtils.reportFatalError method", () => {
    const utilsMethodSuppressed = suppressErrorUtils();

    expect(global.ErrorUtils?.reportFatalError).toBe(customErrorUtilMethod);
    expect(utilsMethodSuppressed).toBe(originalReportFatalError);
  });

  it("should reinstate the original ErrorUtils.reportFatalError method", () => {
    const utilsMethodSuppressed = suppressErrorUtils();
    reinstateErrorUtils(utilsMethodSuppressed);

    expect(global.ErrorUtils?.reportFatalError).toBe(originalReportFatalError);
  });

  it("should run the callback with suppressed ErrorUtils", async () => {
    const utilsMethodSuppressed = suppressErrorUtils();

    const callback = jest.fn().mockResolvedValue(true);
    const result = await errorUtilsContextSwap(callback);

    expect(result).toBe(true);
    expect(callback).toHaveBeenCalled();

    reinstateErrorUtils(utilsMethodSuppressed);
  });

  it("should run the callback with suppressed ErrorUtils even if an error occurs", async () => {
    const utilsMethodSuppressed = suppressErrorUtils();

    const callback = jest.fn().mockRejectedValue(new Error("Test error"));
    const result = await errorUtilsContextSwap(callback);

    expect(result).toBe(false);
    expect(callback).toHaveBeenCalled();

    reinstateErrorUtils(utilsMethodSuppressed);
  });
});
