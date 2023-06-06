import path from "path";
import { createModuleIdFactory } from "../../utils/createModuleIdFactoryRN";

jest.mock("path", () => ({
  relative: jest.fn(),
  dirname: jest.fn(),
}));

jest.mock("../../utils/cyrb53", () => jest.fn());

jest.spyOn(require, "resolve");
/*
jest.mock("../../src/utils/cyrb53", () => ({
  cyrb53: jest.fn(),
}));*/

import cyrb53 from "../../utils/cyrb53";

describe("createModuleIdFactory", () => {
  beforeEach(() => {
    path.relative.mockClear();
    path.dirname.mockClear();
    require.resolve.mockClear();
    cyrb53.mockClear();
  });

  it("should create a module ID factory function", () => {
    const moduleIdFactory = createModuleIdFactory();
    expect(typeof moduleIdFactory).toEqual("function");
  });

  it("should create a module ID based on the packPath", () => {
    const moduleIdFactory = createModuleIdFactory();
    const mockPackPath = "mock/pack/path";
    // path.relative.mockReturnValue("mock/relative/path");
    cyrb53.mockReturnValue(123);

    const moduleId = moduleIdFactory(mockPackPath);

    //expect(require.resolve).toHaveBeenCalledWith("react-native");
    expect(moduleId).toEqual(123);
  });
});
