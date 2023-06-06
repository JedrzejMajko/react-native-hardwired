export const testA = {
  code: `function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _reactNative = _$$_REQUIRE(_dependencyMap[0]);
  var _react = _$$_REQUIRE(_dependencyMap[1])(_$$_REQUIRE(_dependencyMap[2]));
  var Viewx = function Viewx(args) {
    return (0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_reactNative.View, {
      testID: "hardwired-loaded-2",
      children: (0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_reactNative.Text, {
        children: "Hardwired2"
      })
    });
  };
  var _default = Viewx;
  exports.default = _default;
}`,
  dependencies: [
    {
      hashes: [
        768741022705350, 7780418357498032, 4626156116150689, 3005131423557722,
      ],
      names: [
        "node_modules/react-native/index.js",
        "react-native",
        "react-native/index.js",
        "react-native/dist/index.js",
      ],
    },
    {
      hashes: [
        3938602324355364, 8731678160340743, 740068150919335, 6965493899304507,
      ],
      names: [
        "node_modules/@babel/runtime/helpers/interopRequireDefault.js",
        "@babel/runtime/helpers/interopRequireDefault",
        "@babel/runtime/helpers/interopRequireDefault/index.js",
        "@babel/runtime/helpers/interopRequireDefault/dist/index.js",
      ],
    },
    {
      hashes: [
        6646067304043446, 1341884520432410, 5003900108949583, 3353477863717453,
      ],
      names: [
        "node_modules/react/index.js",
        "react",
        "react/index.js",
        "react/dist/index.js",
      ],
    },
    {
      hashes: [
        561027425756064, 5644560847483874, 5483915715160418, 1816414160082411,
      ],
      names: [
        "node_modules/react/jsx-runtime.js",
        "react/jsx-runtime",
        "react/jsx-runtime/index.js",
        "react/jsx-runtime/dist/index.js",
      ],
    },
  ],
};
