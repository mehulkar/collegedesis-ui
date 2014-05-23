export default DS.Model.extend({
  memberships: DS.hasMany('membership'),
  name: DS.attr('string'),
  displayName: DS.attr('string', { readOnly: true }),
  location: DS.attr('string', { readOnly: true }),
  slug: DS.attr('string'),
  universityName: DS.attr('string', { readOnly: true }),
  about: DS.attr('string'),
  reputation: DS.attr('number', { readOnly: true }),
  twitter: DS.attr('string'),
  facebook: DS.attr('string'),
  youtube: DS.attr('string'),
  website: DS.attr('string'),
  instagram: DS.attr('string'),
  membershipApplications: DS.hasMany('membershipApplication'),
  bulletins: DS.hasMany('bulletin'),

  adminMemberships: function() {
    return this.get('memberships').filterProperty('membershipTypeId', 2);
  }.property('memberships.@each.membershipTypeId'),

  nonAdminMemberships: function() {
    return this.get('memberships').filterProperty('membershipTypeId', 1);
  }.property('memberships.@each.membershipTypeId'),

  twitterUrl: function() {
    if (this.get('twitter')) {
      return "http://twitter.com/" + this.get('twitter');
    }
  }.property('twitter'),

  facebookUrl: function() {
    if (this.get('facebook')) {
      return "http://facebook.com/" + this.get('facebook');
    }
  }.property('facebook'),

  youtubeUrl: function() {
    if (this.get('youtube')) {
      return "http://youtube.com/" + this.get('youtube');
    }
  }.property('youtube'),

  instagramUrl: function() {
    if (this.get('instagram')) {
      return "http://instagram.com/" + this.get('instagram');
    }
  }.property('instagram'),

  websiteUrl: function() {
    if (this.get('website')) {
      return "http://" + this.get('website');
    }
  }.property('website'),

  adminApplications: function() {
    return this.get('membershipApplications').filterProperty('membershipTypeId', 2);
  }.property('membershipApplications.@each.membershipTypeId', 'membershipApplications.length'),

  pendingAdminApplications: function() {
    return this.get('adminApplications').filterProperty('applicationStatusId', 1);
  }.property('adminApplications.@each.applicationStatusId')
});