# How To do stuff with Twine 2 and Snowman

I (Peter Orme) am trying to get a grip of how to write interactive stories using Twine 2. I have focused on using the Snowman story format. It doesn't come with a lot of macros and stuff, but it's easy to add pure javascript code snippets here and there.

This is basically just a notebook where I write down problems I come across, and solutions for them. 


## Adding CSS classes for each passage tag

In Twine2 you can add tags to each passage. Some other story formats automatically adds these tags as css classes to the passages, so you can use them in style sheets. Snowman doesn't. Here's a little hack to add that feature. 

Here's a snippet to do this. You can add this to the story javascript:

	// add the passage tags as css classes
	$(window).on('showpassage', function(e, p){
		var tags = p.passage.tags;
		$("div#passage").removeClass();
		for (var i = 0; i < tags.length; i++) {
			$("div#passage").addClass(tags[i]);
		}
	}); 

In fact, if you are using **Frosting**, you get this for free. You can enable or disable the feature by setting 
	
	frosting.features.tagToStyle=true; // or false to disable 


## Render another passage inside a passage

That was easy. Here's how to render the content of the "Banana" passage from another passage:

	<%= window.story.render("Banana") %> 


## Handling a "meta" section (inventory, journals, character sheets, scoring...) + back links

I wanted to do this thing where you can go into some "meta" passages that aren't really part of the story proper - some journal, status, inventory, etc. I cam up with this convention.

#### The `meta` tag convention

** All passages that are outside the story proper, like status, maps, inventory etc, I tag with `meta`. **

This allows me to write logic to find the last "real" position in the story. That means I can e.g. have a side menu that takes you into some "inventory" pages or whatnot, which internally can link to other `meta` pages, and _I can add a link that will close this stuff and take you back to where you are_. 

Inserting this link to close the "meta" pages is as simple as this with **Frosting**:

	<%= frosting.closelink("exit") %>

There's also a method to insert a link to the previous passage, whether or not that was a `meta` passage:

	<%= frosting.backlink("back") %>

Although... I am realizing that actually only makes sense when you are inside a meta tag. If you are in the real world, and enter a dead end with a "back" link, you don't want a back link that takes you into the inventory, you want one that takes you back to the previous real-world passage. But typically you will know the target for that back link when you're writing it, so it's better to just link directly to the target passage. 


### Linking to another passage

Inserting a link to another passage programmatically. 


