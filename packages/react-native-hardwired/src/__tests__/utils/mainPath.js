const path = require("path");

describe("React Native Path", () => {
  it("should resolve the directory of react-native module", () => {
    const reactNativePath = path.dirname(require.resolve("react-native"));
    const expectedPath =
      path.join(reactNativePath, "../..") + "/node_modules/react-native/../.."; //

    const result = require("../../utils/mainPath.js"); // Replace with the actual file path

    expect(result).toBe(expectedPath);
  });
});
