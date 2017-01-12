var assert = require('assert');
var jsdom = require('mocha-jsdom')
var frosting = require('../src/frosting.js');

describe('testing with mocha-jsdom', function () {
 
	jsdom()

	it('has document', function () {
		var div = document.createElement('div')
		assert.equal(div.nodeName, "DIV")
	})

	it('has window', function () {
		assert(window != undefined)
	})
 
	it('should allow mocking stuff in window so it can be accessed from frosting', function(){

		// mock the window.story.passage call
		var PASSAGE_NAME = "kingkong_jdsfgh";
		window.story = {};
		window.story.passage = function(){
			return {"name":PASSAGE_NAME};
		}

		assert.equal(frosting.linkToPassage("foo", "bar"), 
			"<a href=\'javascript:void(0)\' data-passage=\'" + PASSAGE_NAME + "\'>bar</a>");
	});	

})

