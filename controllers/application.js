/**
* Controller du template application
**/

import Ember from 'ember';

export default Ember.ObjectController.extend({
	actions:{
		createGraph : function(){
			this.store.find('node').then(function(nodes){
                nodes.forEach(function(node){
                    node.deleteRecord();
                });
            });
            this.store.find('arc').then(function(arcs){
                arcs.forEach(function(arc){
                    arc.deleteRecord();
                });
            });
		},



		saveSvg: function(){

			var svg = Ember.$("svg")[0];
			//get svg source.
			var serializer = new XMLSerializer();
			var source = serializer.serializeToString(svg);

			//add name spaces.
			if(!source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)){
			    source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
			}
			if(!source.match(/^<svg[^>]+"http\:\/\/www\.w3\.org\/1999\/xlink"/)){
			    source = source.replace(/^<svg/, '<svg xmlns:xlink="http://www.w3.org/1999/xlink"');
			}

			//add xml declaration
			source = '<?xml version="1.0" standalone="no"?>\r\n' + source;

			//convert svg source to URI data scheme.
			var url = "data:image/svg+xml;charset=utf-8,"+encodeURIComponent(source);

			//set url value to a element's href attribute.
			var win = window.open(url, '_blank');
  			win.focus();
		}

	}
});
