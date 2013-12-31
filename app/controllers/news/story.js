export default Ember.ObjectController.extend({
  needs: ['application'],
  comment: null,
  savedComments: Em.computed.filterBy('comments', 'isNew', false),

  updateWindowTitle: (function() {
    var title;
    title = this.get("content.title");
    return $(document).attr('title', "" + title + " - CollegeDesis Radio");
  }).observes('content')
});