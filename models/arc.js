
import DS from "ember-data";

export default DS.Model.extend({
	text: DS.attr('string',{defaultValue:'Association'}),
	source: DS.belongsTo('node'),
	target: DS.belongsTo('node'),
	graph: DS.belongsTo('graph'),
	isSelected: DS.attr('boolean',{defaultValue:false}),
	isCompleted: function(){
		return (this.get('target')!=null && this.get('source')!=null);
	}.property('target'),
	//Moyenne des coordonnées x et y pour l'affichage du nom du noeud
	meanPositionX: function(){
		if(this.get('source')!==null||this.get('target')!==null){
			return (this.get('source').get('x')+this.get('target').get('x'))/2;
		}
	}.property('source.x','target.x'),
	meanPositionY: function(){
		if(this.get('source')!==null||this.get('target')!==null){
			return (this.get('source').get('y')+this.get('target').get('y'))/2;
		}
	}.property('source.y','target.y'),
}).reopenClass({
	FIXTURES: []
});