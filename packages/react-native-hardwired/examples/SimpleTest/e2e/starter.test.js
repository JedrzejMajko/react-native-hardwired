describe('Example', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should have welcome screen', async () => {
    const elem = element(by.id('hardwired')); // .and(by.text('Hardwired'))

    await expect(elem).toBeVisible();

    await expect(element(by.id('hardwired-loaded'))).toBeVisible();
    await expect(element(by.id('hardwired-loaded-2'))).toBeVisible();
  });
});
