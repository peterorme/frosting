var frosting = {}

frosting.features = {};

/* Enables setting css classes from passage tags */
frosting.features.tagToStyle = true;

frosting.version = function(){
	return "Frosting 0.0.1r6"
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

 @method conditionalLink {Boolean} used to select the true or false link.
 @param  condition {String or Number} ID or name of the passage to use if condition is true
 @param  trueIdOrName {String or Number} ID or name of the passage to use if condition is true
 @param  trueLabel {String}  label for the link if condition is true
 @param  falseIdOrName {String or Number} ID or name of the passage to use if condition is false
 @param  flaseLabel {String}  label for the link if condition is false

 @return markup for a link to either passage, depending on the condition.
**/

frosting.conditionalLink = function(condition, trueIdOrName, trueLabel, falseIdOrName, falseLabel){
	if (condition){
		return frosting.linkToPassage(trueIdOrPassage, trueLabel);
	} else {
		return frosting.linkToPassage(falseIdOrPassage, falseLabel);
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

frosting.install();

