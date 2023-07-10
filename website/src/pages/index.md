
- [React Native Hardwired](#project-name)
    - [Prerequisites](#prerequisites)
    - [Road to beta](#road-to-beta)
    - [Purpose](#purpose)
    - [Limitations and security](#limitations-and-security)
    - [React Native Module](#react-native-module)
        - [Installation](#installation)
        - [Usage](#usage)
        - [Define Provider](#define-provider)
        - [Using Temporary module](#using-temporary-module)
    - [Transpiler](#transpiler)
        - [Installation](#installation)
        - [Usage](#usage)
        - [Transpiled JSON format](#transpiled-json-format)
    - [Contributing](#contributing)
    - [Author](#author)
    - [Thanks](#thanks)
    - [License](#license)


## Prerequisites ##

Hardwired consists of two packages:

    react-native-hardwired – a React Native library for app-side usage.
    react-native-hardwired-transpiler – a transpiler for JSX components, converting JSX into Hardwired-compatible code.

The transpiler helps resolve dependencies by mapping the app. Without a map, the transpiler has to guess, which may result in errors.

Here's a high-level illustration of how it works:

```
App -> Map ----------\
Your JSX code -> Transpiler -> Hardwired compatible code -> (Web, DB) -> App
```

## Road to beta
We're currently working on these features for the beta release:

- Loading of non-JSX libraries.
- A more efficient transpiler (skipping Metro) or removing it entirely.
- Chain-loading using a loading manager for dependencies not included in the bundle.
- Enhanced end-to-end tests, supporting more React Native versions.


**Please consider supporting us if you want to see these features implemented!**


## Purpose
Hardwired can be used for:

- Inserting custom control code that changes over time.
- Loading code from the web (e.g., CMS) to save time on app-side parsing.
- Handling code-sensitive functionality like lotteries, games, etc.

If you have an interesting use case, feel free to discuss it in Issues!

## Limitations and security

- Currently, only the latest release of React Native (0.71) is supported. However, since it doesn't contain native code, it should run on previous releases as well.

- The library has been tested on iOS and Android.


- If maps are not used, the transpiler resorts to guessing, which may lead to dependency resolution errors.


- In temporary Modules, only JSX components can be loaded. In permanent module, other code can be loaded but will persist in memory, making it unsuitable for content loading.


- The library uses eval (code injection) which is commonly found in similar libraries. An alternative bytecode support is being developed to mitigate its downsides. In the meantime, using SSL pinning is essential to secure your app. Consider using
  https://github.com/vacuumlabs/js-jail/tree/master or alternatives to secure downloaded code.

- Please remember that your scripts are susceptible to code injections when creating components on the fly. Sanitize any data supplied by the user.

- Module is not compatible with ram bundles.

- it does not accept Bytecode (yet).

- If you need full-scoped, webpack based solution, I suggest using [Repack](https://github.com/callstack/repack) - it has the same security constrains, but allows you to control the entire bundle.

## Testing & building

The repository includes scripts that execute provided Jest unit tests, Detox end-to-end tests, and enforce established ESLint rules.

## React Native module

Refer to the SimpleTest example provided in the packages/react-native-hardwired/examples directory for a functional demonstration of the library's capabilities.

### Installation ###
```shell
npm install --save react-native-hardwired
```

Afterwards it is **REQUIRED** to add a serializer to metro.config.js:
```javascript
const {
  createModuleIdFactory,
} = require('react-native-hardwired/dist/cjs/utils/createModuleIdFactoryNode');

module.exports = {
  serializer: {
    createModuleIdFactory: createModuleIdFactory,
  },
};
```

If you already have metro.config.js, you need to add the following to the exported object (require as above):
```js
  serializer: {
    createModuleIdFactory: createModuleIdFactory
  }
```

If you need to use "import", import esm version of the library:
```js
import { createModuleIdFactory } from 'react-native-hardwired/dist/esm/utils/createModuleIdFactoryNode';
```

### Usage ###

#### Create a map of your app for transpiler

```shell
node ./node_modules/react-native-hardwired/bin/index.js --output-map-file where-to-write-map.json --dominant-platform <ios|android> --entry-file <index.js|index.ios.js|index.android.js>
```

Alternative:
```shell
npx react-native-hardwired --output-map-file where-to-write-map.json --dominant-platform <ios|android> --entry-file <index.js|index.ios.js|index.android.js>
```

--output-map-file represents the filename where the application map will be written. This map will be utilized by the transpiler in the following steps.

--dominant-platform specify the platform (iOS or Android) that is most crucial for your application.

--entry-file corresponds to the initial file of your application, such as index.js, index.ios.js, index.android.js, or any other custom-named file.

Ensure you execute these steps after the incorporation of new modules that will be utilized in components imported to your application.

## Define Provider
It should be defined above any use of TemporaryModule or PermanentModule

```js
import { Provider } from 'react-native-hardwired';
...
<Provider>
    <MainComponent />
</Provider>
```


### Using Temporary module

**The temporary module is designed not to retain in memory, making it suitable for tasks such as loading preformatted rich text.**


```js
import { TemporaryModule } from 'react-native-hardwired';
const transpiledJson = {/*[Transpiled code]*/};
...
const jstComponent = ()=>{
    return (
        <TemporaryModule
            source={transpiledJson}
        />
    )
}
```
The source parameter refers to a JSON object generated by the transpiler, as detailed in the [Transpiled JSON format](#transpiled-json-format) section.
This concise code is all you require, and note that the source can also be a function. This flexibility permits loading of code directly from an API:

```js
import { TemporaryModule } from 'react-native-hardwired';
...
const jstComponent = ()=>{
    return (
        <TemporaryModule
            source={async ()=>{
                return await fetch('https://yourhostname/my-transpiled-component.json');
            }}
        />
    )
}
```


### Using Permanent module

**the permanent module retains data in memory and could be utilized to load reusable components.
This will be more applicable in future updates, once the necessity for the source attribute is eliminated.**

```js
import { PermanentModule } from 'react-native-hardwired';
...
const jstComponent = ()=>{
    return (
        <PermanentModule
            name={"MyModuleName"}
            source={async ()=>{
                return await fetch('https://yourhostname/my-transpiled-component.json');
            }}
        />
    )
}
```

Where source is a JSON object produced by transpiler [Transpiled JSON format](#transpiled-json-format).
Name is a unique name of module.
If you use one that already exist, source will be ignored and module will be loaded from memory (bundle).
This includes bundled components.

## Transpiler
### Installation ###

```shell
npm install --save react-native-hardwired-transpiler
```

### Usage ###

```shell
node ./node_modules/react-native-hardwired-transpiler/bin/index.js  --map mapfile.hardwired.json --no-dependency-names 0 --output-file out.js
```

Alternative syntax:
```shell
npx react-native-hardwired-transpiler --map mapfile.hardwired.json --no-dependency-names 0 --output-file out.js
```

--map argument takes a file containing the map of app's node_modules [Generate app map](#create-a-map-of-your-app-for-transpiler)

--no-dependency-names will skip adding names of libraries to dependencies (reduced output size)

--output-file is a file where transpiled hardwired code will be written. Otherwise it will be printed to stdout.

Output file can be pasted into TemporaryModule or PermanentModule source attribute as is.

### Transpiled JSON format ###

Following JSX component:
```js
import { SafeAreaView, ScrollView, View, Text } from 'react-native';

function App() {
  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <Text>Hardwired</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;
```

After transpilation will generate following code:

```js
{
    code:
      `function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _reactNative = _$$_REQUIRE(_dependencyMap[0]);
  var _react = _$$_REQUIRE(_dependencyMap[1])(_$$_REQUIRE(_dependencyMap[2]));
  var Viewx = function Viewx(args) {
    return (0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_reactNative.View, {
      children: (0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_reactNative.Text, {
        children: "Hardwired"
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
          'node_modules/react-native/index.js',
          'react-native',
          'react-native/index.js',
          'react-native/dist/index.js',
        ],
      },
      {
        hashes: [
          3938602324355364, 8731678160340743, 740068150919335, 6965493899304507,
        ],
        names: [
          'node_modules/@babel/runtime/helpers/interopRequireDefault.js',
          '@babel/runtime/helpers/interopRequireDefault',
          '@babel/runtime/helpers/interopRequireDefault/index.js',
          '@babel/runtime/helpers/interopRequireDefault/dist/index.js',
        ],
      },
      {
        hashes: [
          6646067304043446, 1341884520432410, 5003900108949583,
          3353477863717453,
        ],
        names: [
          'node_modules/react/index.js',
          'react',
          'react/index.js',
          'react/dist/index.js',
        ],
      },
      {
        hashes: [
          561027425756064, 5644560847483874, 5483915715160418, 1816414160082411,
        ],
        names: [
          'node_modules/react/jsx-runtime.js',
          'react/jsx-runtime',
          'react/jsx-runtime/index.js',
          'react/jsx-runtime/dist/index.js',
        ],
      },
    ]
  }
```

Main body of code is transpiled into JS and dependency array is added with possible libraries used.


## Author

* **[Jędrzej Majko](https://github.com/JedrzejMajko)** - *Creator* - [Coobers](https://coobers.com)


## Contributing

0.  Ask a question in the Issues
1.  Fork it!
2.  Create your feature branch: `git checkout -b my-new-feature`
3.  Add your changes: `git add .`
4.  Commit your changes: `git commit -am 'Add some feature'`
5.  Push to the branch: `git push origin my-new-feature`
6.  Submit a pull request

## Thanks

bryc (github.com/bryc) - cyrb53 hashing function.

## License

Hardwired is licensed under the MIT License (MIT).

Copyright © 2023 Jędrzej Majko

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

