export default Ember.ObjectController.extend({
  needs: ['application'],
  comment: null,

  savedComments: Em.computed.filterBy('comments', 'isNew', false),

  updateWindowTitle: (function() {
    var title = this.get("content.title");
    return $(document).attr('title', "" + title);
  }).observes('content')
});