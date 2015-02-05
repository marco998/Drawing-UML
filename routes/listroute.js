/**
* Définition de la route permettant l'affichage des templates avec leurs modèles associés
**/

import Ember from 'ember';
 
export default Ember.Route.extend({
    model: function() {
        return Ember.RSVP.hash({
        	node: this.store.find('node'),
        	graph: this.store.find('graph'),
            arc: this.store.find('arc')
        });
    },
    setupController: function(controller, model){
        this.set('node',model.node);
    	this.set('graph',model.graph);
        this.set('arc',model.arc);
    },
    renderTemplate: function() {
    	this.render('listnode', {    
            into: 'application',         
            outlet: 'listnode',
            model: this.get('node') 
         });
        this.render('properties',{
            into: 'application',
            outlet: 'properties',
            model: this.get('graph')
        });
    	this.render('svg', {    
            into: 'application',         
            outlet: 'svg',
            model: this.get('graph'),
        });
    }
});
