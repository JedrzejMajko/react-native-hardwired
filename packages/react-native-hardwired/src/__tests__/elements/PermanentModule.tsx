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
import React from "react";
import TestRenderer from "react-test-renderer";
import { PermanentModule } from "../../elements/PermanentModule";

import { registerHash } from "../../utils/hashManagement";
import { evaluate } from "../../utils/evaluate";

import { testA } from "../codes/testA";

jest.mock("../../utils/hashManagement");
jest.mock("../../utils/evaluate");

describe("PermanentModule", () => {
  beforeEach(() => {
    registerHash.mockReset();
    evaluate.mockReset();
  });
  it("renders correctly", () => {
    const testRenderer = TestRenderer.create(
      <PermanentModule source={testA} name="TestModulePermanentModule" />
    );
    const tree = testRenderer.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
