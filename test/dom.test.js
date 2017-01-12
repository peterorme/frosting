var assert = require('assert');
var jsdom = require('mocha-jsdom')

describe('mocha tests', function () {
 
  jsdom()
  
  it('has document', function () {
    var div = document.createElement('div')
    // expect(div.nodeName).eql('DIV')

  })
 
})

