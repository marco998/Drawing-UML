/**
* Controller de la vue SVG
**/

import Ember from 'ember';

export default Ember.ObjectController.extend({
	actions:{
		createNode: function(posX,posY,store){

			var node= store.createRecord('node',{
				x: posX,
				y: posY
			});
			store.find('graph', 1).then(function(graph) {
				node.set('graph',graph);
				graph.get("nodes").then(function(nodes){
					nodes.pushObject(node);
					graph.save();
				});

			});
		}
	}
});
