export default Ember.ObjectController.extend({
  needs: ['application'],

  deleteMembership: function(mem) {
    var org = mem.get('organization.name');
    if (window.confirm("Are you sure you want to remove your membership from " + org + "?")) {
      mem.deleteRecord();
      return mem.save();
    }
  },
  numOfOrganizations: function() {
    return this.get('controllers.application.numOfOrganizations');
  }.property('controllers.application.numOfOrganizations'),

  setContent: function() {
    return this.set('content', this.get('controllers.application.currentUser'));
  }.observes('controllers.application.currentUser')
});