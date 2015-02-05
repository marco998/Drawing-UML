/**
* Controller du template propriétés
**/

import Ember from 'ember';

export default Ember.ObjectController.extend({
	actions:{
		saveVisibility: function(){
			var selectedValue= Ember.$('select :selected').val();
			this.store.find('node').then(function(nodes){
                nodes.forEach(function(node){
                    if(node.get('isSelected')){
						node.set('visibility',selectedValue.toString());
						node.save();
					}
                });
            });			
		},

		saveAbstract: function(){
			var isAbstract= Ember.$("#abstract").is(':checked');
			console.log(isAbstract);
			this.store.find('node').then(function(nodes){
                nodes.forEach(function(node){
                    if(node.get('isSelected')){
						node.set('isAbstract',isAbstract);
						node.save();
					}
                });
            });		
		}
	},
});
