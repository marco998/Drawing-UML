/**
* Vue répresentant les balises rect SVG et les actions associées
**/

import Ember from 'ember';

var selectedElement = 0;
var currentX = 0;
var currentY = 0;
var currentMatrix = 0;
var posXinRect=0;
var posYinRect=0;
var click;


export default Ember.View.extend({
	
    tagName: "rect",
	attributeBindings: ['id','x','y','width','height','stroke','style','fill','transform'],
	width: "100",
	height: "150",
	stroke: "black",
	fill: "white",
    //transform: "matrix(1 0 0 1 0 0)",
	
    didInsertElement: function(){
        //Mise à jour du select de la visibilité
        Ember.$("select").val(this.get('context').get('visibility'));
    },

	mouseDown: function selectElement(evt) {
        click=true;
        if( Ember.$('input:radio[value="createNode"]').is(":checked")) {
           
            //Mise en place du drag&drop d'un noeud

            selectedElement = evt.target;

            this.store.find('node').then(function(nodes){
                nodes.forEach(function(node){
                    node.set('isSelected',false);
                });
            });

            posXinRect= evt.clientX-this.get('context').get('x')-Ember.$("svg").offset().left;
            posYinRect= evt.clientY-this.get('context').get('y')-Ember.$("svg").offset().top;
            currentX = evt.clientX;
            currentY = evt.clientY;
            //currentMatrix = selectedElement.getAttributeNS(null, "transform").slice(7,-1).split(' ');
            currentMatrix= Ember.$("g[id="+this.get('context').get('id')+"]")[0].getAttributeNS(null, "transform").slice(7,-1).split(' ');

            for(var i=0; i<currentMatrix.length; i++) {
               currentMatrix[i] = parseFloat(currentMatrix[i]);
            }
        }

        
        if( Ember.$('input:radio[value="createArc"]').is(":checked")) {
            
            //Création d'un arc avec enregistrement du premier noeud
            this.store.createRecord('arc',{
                source: this.get('context'),
                graph: this.get('context').get('graph')
            });
        }

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
        }
	},

	mouseMove: function moveElement(evt) {
        if(click){
            //Déplacement du noeud à l'aide d'une transformation de matrice

            if( Ember.$('input:radio[value="createNode"]').is(":checked")) {
            
                var dx = evt.clientX - currentX;
                var dy = evt.clientY - currentY;
                currentMatrix[4] += dx;
                currentMatrix[5] += dy;
              
                try{
                    //selectedElement.setAttributeNS(null, "transform", "matrix(" + currentMatrix.join(' ') + ")");
                    Ember.$("g[id="+this.get('context').get('id')+"]")[0].setAttributeNS(null, "transform", "matrix(" + currentMatrix.join(' ') + ")");
                }catch(e){}
                currentX = evt.clientX;
                currentY = evt.clientY;

    	    }
        }
    },

	mouseUp: function deselectElement(evt) {
        click=false;
        if( Ember.$('input:radio[value="createNode"]').is(":checked")) {

            //Enregistrement des coordonnées finales du noeud
            if(selectedElement != 0){
                console.log(this.get('context'));
                this.get('context').set('x',evt.clientX - Ember.$("svg").offset().left-posXinRect);
                this.get('context').set('y',evt.clientY - Ember.$("svg").offset().top-posYinRect);
                selectedElement = 0;
                this.get('context').set('isSelected',true);
            }
        }

        if( Ember.$('input:radio[value="createArc"]').is(":checked")) {

            //Enregistrement du noeud target pour l'arc créé
            var arc=this.store.all('arc').get('lastObject');
            if(arc.get('source')!==this.get('context')){
                arc.set('target',this.get('context'));
            }
        }

        if( Ember.$('input:radio[value="delete"]').is(":checked")) {

            //Suppression du noeud
            this.get('context').deleteRecord();
            this.get('context').save();
        }

    },

	mouseLeave: function deselectElement(evt) {
        if( Ember.$('input:radio[value="createNode"]').is(":checked")) {

            //Enregistrement des coordonnées finales du noeud
            if(selectedElement != 0){
                this.get('context').set('x',evt.clientX - Ember.$("svg").offset().left+posXinRect);
                this.get('context').set('y',evt.clientY - Ember.$("svg").offset().top+posYinRect);
                selectedElement = 0;
            }
            this.rerender();
        }

    }

});