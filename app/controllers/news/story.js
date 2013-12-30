var NewsStoryController = Ember.ObjectController.extend({
  needs: ['application'],
  comment: null,
  savedComments: Em.computed.filterBy('comments', 'isNew', false),
  hasBeenVotedOn: (function() {
    var user;
    user = this.get('controllers.application.currentUser');
    if (this.get('votes').findProperty('user', user)) {
      return true;
    } else {
      return false;
    }
  }).property('votes.@each.isNew', 'controllers.application.currentUser.id'),
  updateWindowTitle: (function() {
    var title;
    title = this.get("content.title");
    return $(document).attr('title', "" + title + " - CollegeDesis Radio");
  }).observes('content')
});

export default  NewsStoryController;