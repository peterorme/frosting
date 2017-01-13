// frosting.test.js

var assert = require('assert');

// is this at all how you are supposed to wire these things up? 
// Or shuold you pipe stuff with gulp? Or something else? 
var frosting = require('../src/frosting.js');

describe('fake success', function() {
  it('should always succceed', function() {
    assert.equal(1, 1);
  });
});


/* 
describe('fake failure', function() {
  it('should always fail', function() {
    assert.equal(1, 2);
  });
});
*/

describe ('basic setup', function(){
	it('should define a frosting object', function(){
		assert(frosting != undefined);
	});

	// This is run without the mocha-jsdom, so there is no "window" object here, 
	// or in the frosting context. 
	it('should not have a mock window object', function(){
		assert(typeof window == "undefined");
	});
});


describe ('frosting.version()', function(){
	// this will return the name and version defined in package.json, so we will need to update this test when 
	// that changes.
	it('should return 0.0.3-SNAPSHOT', function(){
		assert.equal(frosting.version(), "Frosting 0.0.3-SNAPSHOT");
	})	
});


describe ('frosting.features', function(){
	it('should define a features object', function(){
		assert(frosting.features != undefined);
	});

	it(' tagToStyle should default to true', function(){
		assert(frosting.features.tagToStyle == true);
	});
});




