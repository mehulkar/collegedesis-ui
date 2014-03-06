export default DS.Model.extend({
  user: DS.belongsTo('user'),
  organization: DS.belongsTo('organization'),
  approved: DS.attr('boolean'),
  displayName: DS.attr('string'),
  membershipTypeId: DS.attr('number'),

  notApproved: Em.computed.not('approved'),

  loading: function() {
    if (this.get('isLoaded') && this.get('organization.isLoaded')) {
      return false;
    } else {
      return true;
    }
  }.property('isLoaded', 'organization.isLoaded')
});