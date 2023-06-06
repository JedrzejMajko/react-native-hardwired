const dependencies = require('../../src/utils/dependencies');
const moduleIdFactory = require('../../src/utils/createModuleIdFactoryNode.js');
const findDependencyNames = require('../../src/utils/findDependencyNames.js');

jest.mock('../../src/utils/createModuleIdFactoryNode.js');
jest.mock('../../src/utils/findDependencyNames.js');

describe('Dependencies function', () => {
  it("should build hardwired dependency object based on metro's dependencies", () => {
    const list = [
      {
        name: 'dependency1',
      },
    ];

    const entryFile = 'entryFile';
    const deps = (file, name) => ({
      to: 'toPath',
    });
    const cliOptions = {
      mainPath: 'mainPath',
      noDependencyNames: false,
    };

    const factoryMockReturnedPaths = jest.fn();
    findDependencyNames.mockReturnValue(factoryMockReturnedPaths);
    factoryMockReturnedPaths.mockReturnValueOnce(['path1']);

    const factoryMock = jest.fn();
    moduleIdFactory.createModuleIdFactory.mockReturnValue(factoryMock);
    factoryMock.mockReturnValueOnce(1).mockReturnValueOnce(2);

    const result = dependencies(list, entryFile, deps, cliOptions);

    expect(factoryMock).toHaveBeenCalledTimes(1);
    expect(factoryMock).toHaveBeenCalledWith('../toPath');

    expect(result).toEqual([
      {
        hashes: [1],
        names: ['../toPath'],
      },
    ]);
  });
});
