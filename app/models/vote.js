var Vote = DS.Model.extend({
  user: DS.belongsTo('user'),
  bulletin: DS.belongsTo('bulletin')
});

export default Vote;