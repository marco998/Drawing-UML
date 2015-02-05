import DS from 'ember-data';

export default DS.Model.extend({
	text: DS.attr('string',{defaultValue:"Classe"}),
	visibility: DS.attr('string',{defaultValue:'public'}),
	x: DS.attr('number'),
	y: DS.attr('number'),
	isSelected: DS.attr('boolean', {defaultValue:false}),
	isAbstract: DS.attr('boolean',{defaultValue:false}),
	graph: DS.belongsTo('graph'),
	
	meanX: function(){
		return (this.get('x')+50);
	}.property('x'),
	meanY: function(){
		return (this.get('y')+75);
	}.property('y'),
	textPosX: function(){
		return(this.get('x')+25);
	}.property('x'),
	textPosY: function(){
		return(this.get('y')+5);
	}.property('y'),
	linePosX: function(){
		return this.get('x')+100;
	}.property('x'),
	linePosY: function(){
		return this.get('y')+30;
	}.property('y')
}).reopenClass({
	FIXTURES: []
});