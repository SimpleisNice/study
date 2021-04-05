describe('createUser(id, info)', function() {
  it('id test.', function() {
    const testId = 'Hong';
    const testInfo = {
      age: '20',
      height: '180',
      live: 'seoul',
    }

    const user = createUser(testId, testInfo);
    expect(user.testId).toBe(testId);
  })

  it('testInfo test', function () {
    const testId = 'Hong';
    const testInfo = {
      age: '20',
      height: '180',
      live: 'seoul',
    };

    const user = createUser(testId, testInfo);
    expect(user.testInfo).toBe(testInfo);
  });
});