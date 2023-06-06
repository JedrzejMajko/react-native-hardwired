const path = require('path');
const {
  createModuleIdFactory,
} = require('../../src/utils/createModuleIdFactoryNode');
const cyrb53 = require('../../src/utils/cyrb53');

jest.mock('path', () => ({
  relative: jest.fn(),
  dirname: () => 'test',
}));

jest.mock('../../src/utils/cyrb53', () => jest.fn());

jest.spyOn(require, 'resolve');

describe('createModuleIdFactory', () => {
  beforeEach(() => {
    path.relative.mockClear();
    require.resolve.mockClear();
    cyrb53.mockClear();
  });

  it('should create a module ID factory function', () => {
    const moduleIdFactory = createModuleIdFactory();
    expect(typeof moduleIdFactory).toEqual('function');
  });

  it('should create a module ID based on the packPath', () => {
    const moduleIdFactory = createModuleIdFactory();
    const mockPackPath = 'mock/pack/path';
    cyrb53.mockReturnValue(123);

    const moduleId = moduleIdFactory(mockPackPath);

    expect(moduleId).toEqual(123);
  });
});
