// hello.test.js

var assert = require('assert');

describe('fake success', function() {
  it('should always succceed', function() {
    assert.equal(1, 1);
  });
});

describe('fake failure', function() {
  it('should always fail', function() {
    assert.equal(1, 2);
  });
});
