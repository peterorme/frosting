/**
 * Frosting is an extension for Twine 2 (mainly intended for use with the Snowman story format).
 *
 * @module frosting 
 **/

/** 
 * Actually there is no Frosting class per se, it's just a main frosting object. 
 * 
 * @class Frosting 
 **/

var package_json = require('./../package.json')


/* 
This "frosting" is a temporary object. By attaching functions to this object, we can call one function 
from another. in the main.js we include the module exports of this file as "frosting" again. We could 
call this object something else if we wanted to. 
*/

frosting = {};

frosting.features = {
	"tagToStyle": true	/* Enables setting css classes from passage tags */
},

frosting.version = function(){
	return package_json.name + " " + package_json.version;
}

/**
Returns the markup for a link to a passage. If no label is given, the name of the passage
will be used, if we can find it. 

@method linkToPassage
@param  idOrName {String or Number} ID or name of the passage
@param  label {String} the text of link, may be left undefined
@return markup for a link to that passage. 
**/

frosting.linkToPassage = function(idOrName, label){

	// if we don't pass in an idOrName, we just return the label, or an empty space if 
	// the label is also undefined
	if (!idOrName){
		return label ? label : "";
	}

	var p = window.story.passage(idOrName);

	if (label == undefined){
		label = p ? p.name : idOrName;
	}
	var ref = p ? p.name : idOrName; // keep idOrName for debugging if we can't find the passage

	return "<a href='javascript:void(0)' data-passage='" + ref + "'>" + label + "</a>";
}

/**
Depending on a boolean condition, return the markup for one of two links. This is intended
as a one-liner for inserting a link in a passage. This calls linkToPassage, and the logic 
for resolving undefined labels is the same. 

@method conditionalLink 
@param  condition {Boolean} used to select the true or false link.
@param  trueIdOrName {String or Number} ID or name of the passage to use if condition is true
@param  trueLabel {String}  label for the link if condition is true
@param  falseIdOrName {String or Number} ID or name of the passage to use if condition is false
@param  flaseLabel {String}  label for the link if condition is false

@return markup for a link to either passage, depending on the condition.
**/

frosting.conditionalLink = function(condition, trueIdOrName, trueLabel, falseIdOrName, falseLabel){
	if (condition){
		return frosting.linkToPassage(trueIdOrName, trueLabel);
	} else {
		return frosting.linkToPassage(falseIdOrName, falseLabel);
	}
}

/**
Returns the markup for a link to the previous passage. Calls linkToPassage and uses the 
same logic for undefined labels. 

@method  backlink
@param   label  the text to use for the link, may be undefined
@return  the markup for a link
**/

frosting.backlink = function(label){
	var id = window.story.history[window.story.history.length-2];
	return frosting.linkToPassage(id, label);
}

/**
Returns the markup for a link to the last passage that was not tagged as "meta". 
If you supply a label it will be used, otherwise we use the name of the passage. 

@method  closelink 
@param   label {String} the label of the link
@return  the markup for a link
**/ 
frosting.closelink = function(name){
	var mostRecentNonMeta = undefined;

	for(var i=window.story.history.length-2; i>=0; i--){
		var p = window.story.history[i];
		if (frosting.hasTag(p, "meta") == false){ // can be true, false or undefined
			mostRecentNonMeta = p;
			break;
		}
	}

	if (mostRecentNonMeta != undefined){
		return frosting.linkToPassage(mostRecentNonMeta, name);
	}
	return undefined;
}

/**
Checks whether a passage has a given tag. 

@method  hasTag
@param  pid {Integer}  a passage id
@param  tag {String} the given tag
@return true if the passage has that tag, false if it does not, and undefined if the passage does not exist
**/
frosting.hasTag = function(pid, tag){
	var p = window.story.passages[pid];

	if (p == undefined){
		return undefined;
	}
	var test = $.inArray(tag, p.tags);
	return test > -1;
}

/** 
Checks whether a passage is in the history.

@method hasSeen
@param idOrName  the pid or name of a passage (undefined = current passsage)
@return  true if the passage is in the history, else false 
@throws  {ReferenceError} if the passage cannot be found
**/
frosting.hasSeen = function(idOrName){
	var psg; // the passage we're interested in

	if (idOrName){
		psg = window.story.passage(idOrName);
		if (psg == undefined){
			throw new ReferenceError("No such passage: " + idOrName);
		}
	} else {
		// use the current passage
		psg = window.passage;
	}
	var index = window.story.history.indexOf(psg.id);
	var t = index != -1 && index < window.story.history.length-1;
	if (frosting.debug) console.log("frosting.hasSeen passage " + psg.name + " --> " + t);
	return t;
}

/** 
Installs features like the tagToStyle feature. Just call install once to install all the callbacks, 
and use the frosting.features map to set named features to true or false to enable or disable them. 
@method  install
*/
frosting.install = function(){
	// add the passage tags as css classes
	$(window).on('showpassage', function(e, p){
		if (frosting.features.tagToStyle){
			var tags = p.passage.tags;
			$("div#passage").removeClass();
			for (var i = 0; i < tags.length; i++) {
				$("div#passage").addClass(tags[i]);
			}
		}
	}); 
}

// TODO: figure out a way to auto-install this. 
// frosting.install();

// this is where we define which methods to expose
module.exports = {
	features: frosting.features, 
	version: frosting.version,
	linkToPassage: frosting.linkToPassage,
	hasSeen: frosting.hasSeen,
	hasTag: frosting.hasTag,
	backlink: frosting.backlink,
	closelink: frosting.closelink,
	conditionalLink: frosting.conditionalLink,
	install: frosting.install
};
