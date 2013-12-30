export default Ember.ObjectController.extend({
  needs: ['application', 'newsStory'],

  actions: {
    vote: function() {
      var user = this.get('controllers.application.currentUser');
      if (user) {
        if (this.get('controllers.newsStory.hasBeenVotedOn')) {
          return undefined;
        } else {
          this.get('content').save();
        }
      }
    },
  },
});