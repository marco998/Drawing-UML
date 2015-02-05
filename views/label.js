/**
* Vue réprésentant les listes de texte dans la zone explorateur
**/
import Ember from 'ember';

export default Ember.View.extend({
	tagName : "label",
	attributeBindings: ['style'],
	classNameBindings: ['class'],
	class: "listnode-label",

	mouseDown: function(){

		if( Ember.$('input:radio[value="delete"]').is(":checked")) {
			//Suppression du noeud ainsi que des arcs associées
            var id=this.get('context').get('id');
            this.store.find('arc').then(function(arcs){
                arcs.forEach(function(arc){
                    if(arc.get('source').get('id')==id || arc.get('target').get('id')==id){
                        arc.deleteRecord();
                    }
                });
            });
        }else{

        	//Mise à zéro des sélections
			this.store.find('node').then(function(nodes){
	            nodes.forEach(function(node){
	                node.set('isSelected',false);
	            });
	        });
	    	this.store.find('arc').then(function(arcs){
	            arcs.forEach(function(arc){
	                arc.set('isSelected',false);
	            });
	        });
	    }
	},

	mouseUp: function(){

		//Sélection du noeud ou arc 
		this.get('context').set('isSelected',true);
		Ember.$("select").val(this.get('context').get('visibility'));
		if( Ember.$('input:radio[value="delete"]').is(":checked")) {
			//Suppression du modèle concernée
			this.get('context').deleteRecord();
            this.get('context').save();
            
        }
	}
	
});
