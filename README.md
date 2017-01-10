# Frosting

**Frosting** is a little javascript library adding some functionality to [Twine 2](http://twinery.org/) and 
[Snowman](https://bitbucket.org/klembot/snowman-2). 


### How to include Frosting in a story

I'm not sure what the best way is. _One_ way is to add this in the first passage: 

	<script> 
		// import the Frosting library  
		var url = "https://rawgit.com/peterorme/frosting/master/frosting_0.0.1.js";
			
		$.getScript(url, function(data, textStatus, jqxhr) {
		  window.frosting = frosting;
		});
	</script>


### How to use methods (with Snowman)

In a passage, you can things like this: 

	<%= frosting.backlink("back") %>

That particular line will insert a link that will take the player back to previous passage.



### API SUMMARY

**frosting.linkToPassage(idOrName, label)**

Inserts a link to a passage. If the label is undefined we use the name of the passage.  


**frosting.conditionalLink(condition, trueIdOrName, trueLabel, falseIdOrName, falseLabel)**

Inserts one of two links, depending on a condition. 

For example, this one-liner will check a variable `window.story.state.hasKey`, or in shorthand `s.hasKey`, and depending on that it will either insert a link "unlock the door" that leads to the passage "gate opens", or a link called "try the door" that leads to the passage "gate locked". 

	<%= frosting.conditionalLink(s.hasKey, "gate opens", "unlock the door", "gate locked", "try to the door") %>

The condition can be a calculation, like `(s.coins > 5)`. 


**frosting.backlink(label)**

Returns a link to the previous passage. If the label is undefined we use the name of the passage. 


**frosting.closelink(label)**

Returns a link to the previous passage which has not been tagged as `meta`. If the label is undefined we use the name of the passage. 



### Features and feature flags 

Frosting also adds some other magic. For example, the `tagToStyle` feature adds a CSS class for each passage. 

Such features can be enabled or disabled by setting a boolean flag on the `window.frosting.features` object. 

Enable a feature:

	<% frosting.features.tagToStyle=true; %>

Disable a feature: 

	<% frosting.features.tagToStyle=false; %>


### Named features 

**frosting.features.tagToStyle**

This feature adds a css class for each tag a passage has. 

One thing is that it now adds the passage tags as css classes for each passage, so that you can use that in style sheets. 

For example, you could add this to the story Stylesheet: 

	div.meta {
		border: 2px solid black;
		padding: 10px;
	}

If you add the tag "meta" to a passage, that passage will now be displayed with a black border. 

