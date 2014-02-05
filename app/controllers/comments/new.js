export default Ember.ObjectController.extend({
  needs: ['application', 'news/story'],

  actions: {
    submit: function() {
      var user = this.get('controllers.application.currentUser');
      if (user) {
        if (!user.get('approved')) {
          this.transitionToRoute('me');
        } else {
          if (this.get('body')) {
            var self = this;
            var comment = this.get('content');
            comment.save().then(function(comment) {
              //TODO investigate why this relationship doesn't automatically work
              comment.get('bulletin.comments').pushObject(comment);
              self.createNewComment();
            });
          }
        }
      }
    },
  },

  createNewComment: function() {
    var comment = this.store.createRecord('comment', {
      bulletin: this.get('controllers.newsStory.content')
    });
    this.set('content', comment);
  }
});