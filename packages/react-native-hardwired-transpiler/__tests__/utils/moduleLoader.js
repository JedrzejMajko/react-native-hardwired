const path = require('path');
const Module = require('module');

const {
  extendedGetResolveDependencyFn,
  moduleLoader,
} = require('../../src/utils/moduleLoader');

jest.mock('path');
jest.mock('module', () => ({ _load: jest.fn() }));

describe('extendedGetResolveDependencyFn', () => {
  it('returns a function that resolves dependency', async () => {
    const getResolveDependencyFn = jest.fn();
    const options = { mainPath: '/path/to/main' };
    const map = {
      'relative/path/to/module': ['mockModulePath'],
    };

    const resolveFn = jest.fn();
    getResolveDependencyFn.mockResolvedValue(resolveFn);
    path.relative.mockReturnValue('relative/path/to/module');

    const result = await extendedGetResolveDependencyFn(
      getResolveDependencyFn,
      options,
      map
    );

    const resolvedSet = await result(jest.fn(), jest.fn(), 'toModule');
    const resolvedPath = resolvedSet('fromModule', 'toModule');

    expect(getResolveDependencyFn).toBeCalled();
    expect(path.relative).toBeCalledWith(options.mainPath, 'toModule');
    expect(resolvedPath).toEqual('mockModulePath');
  });
});

describe('moduleLoader', () => {
  it('returns a function that loads modules', () => {
    const map = {};
    const options = {};
    const request = 'lib/transformHelpers';
    const parent = { id: '/transpile.js' };
    Module._load.mockReturnValue({ getResolveDependencyFn: jest.fn() });

    const loader = moduleLoader(map, options);
    const result = loader(request, parent);

    expect(Module._load).toBeCalledWith(request, parent);
    expect(result).toHaveProperty('getResolveDependencyFn');
  });
});
