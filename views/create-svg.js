/**
* Vue représentant la balise SVG
**/

import Ember from 'ember';
import svg from '../controllers/create-svg';

	var posX = 0;
	var posX1 = 0;
	var posX2 = 0;
	var posY = 0;
	var posY1 = 0;
	var posY2 = 0;

export default Ember.View.extend({
	tagName: "svg",
	attributeBindings: ['width','height'],
	width: "100%",
	height: "100%",

	init: function() {
        this._super();
        this.set("controller", svg.create());
    },

	click: function(evt){
	
		if(Ember.$('input:radio[value="createNode"]').is(":checked")) {

			posX = evt.pageX - Ember.$("svg").offset().left;
			posY = evt.pageY - Ember.$("svg").offset().top;
			this.get('controller').send('createNode',posX,posY,this.store);
			this.rerender();

		}
	},

	mouseUp: function(evt){
		
		this.store.find('arc').then(function(arcs){
            arcs.forEach(function(arc){
                if(arc.get('target')==null || arc.get('source')==null){
                	arc.deleteRecord();
                }
            });
        });
    }

});
