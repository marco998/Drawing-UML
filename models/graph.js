import DS from 'ember-data';

export default DS.Model.extend({
	title: DS.attr('string'),
	nodes: DS.hasMany('node',{ async: true}),
	arcs: DS.hasMany('arc',{ async: true})
}).reopenClass({
	FIXTURES: [
		{
			id:1,
			title:'Graphe',
		}
	]
});

