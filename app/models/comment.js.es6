export default DS.Model.extend({
  body: DS.attr('string'),
  bulletin: DS.belongsTo('bulletin'),
  author: DS.attr('string'),
  user: DS.belongsTo('user'),
  createdAt: DS.attr('date')
});