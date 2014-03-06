export default DS.Model.extend({
  email: DS.attr('string'),
  password: DS.attr('string'),
  user: DS.belongsTo('user'),
});