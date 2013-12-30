export default DS.Model.extend({
  user: DS.belongsTo('user'),
  bulletin: DS.belongsTo('bulletin')
});