export default DS.Model.extend({
  user: DS.belongsTo('user'),
  membershipTypeId: DS.attr('number'),
  organization: DS.belongsTo('organization'),
  applicationStatusId: DS.attr('number'),

  membershipTypeName: function() {
    if (this.get("membershipTypeId") === 1) {
      return "a Member";
    } else {
      return "an Administrator";
    }
  }.property('membershipTypeId'),

  status: function() {
    switch (this.get('applicationStatusId')) {
      case 1:
        return "pending";
      case 2:
        return "approved";
      case 3:
        return "rejected";
      default:
        return "Not sure";
    }
  }.property('applicationStatusId')
});