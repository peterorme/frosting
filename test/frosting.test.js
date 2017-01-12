// frosting.test.js

var assert = require('assert');

// is this at all how you are supposed to wire these things up? 
// Or shuold you pipe stuff with gulp? Or something else? 
var frosting = require('../src/frosting.js');

// Should I set up a fixture somehow, or can I just mock/stub stuff here?  
var window = {};

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

	// Should it, actually? These are unit tests, so why not? 
	it('should have a mock window object', function(){
		assert(window != undefined);
	});
});


describe ('frosting.version()', function(){
	it('should return 0.0.2-SNAPSHOT', function(){
		assert.equal(frosting.version(), "Frosting 0.0.2-SNAPSHOT");
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


describe ('frosting.linkToPassage', function(){

	it('should return the label if the idOrName is undefined', function(){
		assert.equal(frosting.linkToPassage(undefined, "banana"), "banana");
	});

	it('should return empty string if both are undefined', function(){
		assert.equal(frosting.linkToPassage(undefined, undefined), "");
	});	
});

