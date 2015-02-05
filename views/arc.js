/**
* Vue représentant la balise line et ses interactions associées
**/

import Ember from 'ember';

export default Ember.View.extend({
	tagName: "line",
	attributeBindings: ['x1','y1','x2','y2','stroke','stroke-width','style'],

	click: function(){
        if( Ember.$('input:radio[value="delete"]').is(":checked")){
        	this.get('context').deleteRecord();
            this.get('context').save();
        } 
	},

});
