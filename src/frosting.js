module.exports = {
	features: {"tagToStyle": true},

	version: function() {
		return "Frosting 0.0.2-SNAPSHOT";
	},

	linkToPassage: function(idOrName, label){

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

};
