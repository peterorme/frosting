var assert = require('assert');
var jsdom = require('mocha-jsdom')
var frosting = require('../src/frosting.js');


// sets up a mocked window.story.passage function
var stubPassage = function(w){
 	w.story = {
 		passage: function(idOrName){
 			if (idOrName=="gronk-passage") {
 				return {name:"gronk"}
 			} else {
 				return undefined;
 			}
 		}
 	}
}


describe('testing with mocha-jsdom', function () {

	jsdom()

	it('has document', function () {
		var div = document.createElement('div')
		assert.equal(div.nodeName, "DIV")
	})

	it('has window', function () {
		assert(window != undefined)
	})
 

	/* This ooks like a test of linkToPassage method, but that's sort of accidental. 
	It is actually testing that the jsdom stuff is working in a way so that we add a method to the 
	window object (which in a browser is the real window, but here it's a fake one) so that we 
	we can mock method calls done to it inside the frosting lib. In this case, we know that the 
	frosting.linkToPassage(a, b) will call window.story.passage(a) and access the name property 
	of the object that method returns.
	*/
	it('should allow mocking stuff in window so it can be accessed from frosting', function(){

		// mock the window.story.passage call
		var PASSAGE_NAME = "kingkong_jdsfgh";
		window.story = {};
		window.story.passage = function(idOrName){
			if (idOrName == "foo") return {"name":PASSAGE_NAME};
		}

		assert.equal(frosting.linkToPassage("foo", "bar"), 
			"<a href=\'javascript:void(0)\' data-passage=\'" + PASSAGE_NAME + "\'>bar</a>");
	});	
})



describe ('frosting.linkToPassage', function(){

 	jsdom() 

	it('should return the label if the idOrName is undefined', function(){
		assert.equal(frosting.linkToPassage(undefined, "banana"), "banana")
	})

	it('should return empty string if both are undefined', function(){
		assert.equal(frosting.linkToPassage(undefined, undefined), "")
	})

	it("should return a link to the passage if it can be found, with the given label", function(){
		stubPassage(window)

		assert.equal(frosting.linkToPassage("gronk-passage", "bar"), 
		"<a href=\'javascript:void(0)\' data-passage=\'gronk\'>bar</a>")
	})

	it("should return a link to the passage if it can be found, using the name if the label is undefined", function(){
		stubPassage(window)

		assert.equal(frosting.linkToPassage("gronk-passage", undefined), 
		"<a href=\'javascript:void(0)\' data-passage=\'gronk\'>gronk</a>")
	})

	it('should return the label if the idOrName does not exist', function(){
		stubPassage(window)

		assert.equal(frosting.linkToPassage("bad-passage", "my-label"), 
			"<a href=\'javascript:void(0)\' data-passage=\'bad-passage\'>my-label</a>")
	})

});

describe ("frosting.backlink", function(){

	jsdom();

	it("should return the label if there is no history", function(){

		window.story = {};
		window.story.history = [];
	
		var link = frosting.backlink("go back");
		assert.equal(link, "go back");
	})


	it("should return the a link to the previous passage", function(){

		/* this requires a little setting up. Let's just randomly say the history is [1,3,9,5]
		 * that means the _current_ passage, the last in the history, is number 5. 
	     * We then expect to use the name of the passage
		 */
		window.story = {};
		window.story.history = [1, 3, 9, 5];

		// mock this to return a simplified passage only for idOrName==9. We know we're only using 
		// the name of the passage, so let's only include that.
		window.story.passage = function(idOrName){
			if (idOrName == 9) {
				return {"name": "goopfoop"};
			}
			return {"name":"unexpected"}
		}
		var link = frosting.backlink("turn around");
		assert.equal(link, "<a href=\'javascript:void(0)\' data-passage=\'goopfoop\'>turn around</a>");
	})


})