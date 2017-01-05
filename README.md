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


