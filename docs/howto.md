# How To do stuff with Twine 2 and Snowman

I (Peter Orme) am trying to get a grip of how to write interactive stories using Twine 2. I have focused on using the Snowman story format. It doesn't come with a lot of macros and stuff, but it's easy to add pure javascript code snippets here and there.

This is basically just a notebook where I write down problems I come across, and solutions for them. 


## Adding CSS classes for each passage tag

In Twine2 you can add tags to each passage. Some other story formats automatically adds these tags as css classes to the passages, so you can use them in style sheets. Snowman doesn't. Here's a little hack to add that feature. 

Add this to the story javascript

	// add the passage tags as css classes
	$(window).on('showpassage', function(e, p){
		var tags = p.passage.tags;
		$("div#passage").removeClass();
		for (var i = 0; i < tags.length; i++) {
			$("div#passage").addClass(tags[i]);
		}
	}); 



## Render another passage inside a passage

That was easy. Here's how to render the content of the "Banana" passage from another passage:

	<%= window.story.render("Banana") %> 

