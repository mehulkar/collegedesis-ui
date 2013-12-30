export default DS.Model.extend({
  body: DS.attr('string'),
  bulletin: DS.belongsTo('bulletin'),
  author: DS.attr('string'),
  createdAt: DS.attr('date')
});