var User = DS.Model.extend({
  fullName: DS.attr('string'),
  email: DS.attr('string'),
  password: DS.attr('string'),
  passwordConfirmation: DS.attr('string'),
  imageUrl: DS.attr('string'),
  approved: DS.attr('boolean'),
  memberships: DS.hasMany('membership'),
  membershipApplications: DS.hasMany('membershipApplication'),
  bulletins: DS.hasMany('bulletin'),

  adminMemberships: (function() {
    var t;
    t = this.store('membershipType', 2);
    return this.get('memberships').filterProperty('membershipType', t);
  }).property('memberships.@each.membershipType'),
  adminOf: function(orgId) {
    return this.get('adminMemberships').mapProperty('organization.id').contains(orgId);
  },
  memberOf: function(orgId) {
    return this.get('memberships').mapProperty('organization.id').contains(orgId);
  },
  pendingMembershipApplications: (function() {
    return this.get('membershipApplications').filterProperty('applicationStatusId', 1);
  }).property('membershipApplications.@each.applicationStatusId'),
  organizations: (function() {
    return this.get('memberships').mapProperty('organization');
  }).property('memberships.@each.organization')
});

export default User;