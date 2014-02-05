export default Ember.ObjectController.extend({
  needs: ['application'],
  comment: null,

  savedComments: function() {
    var comments = this.get('comments');
    return comments.filter(function(item) {
      if (!item.get('isNew')) {
        return item;
      }
    });
  }.property('comments.@each.isNew'),

  updateWindowTitle: (function() {
    var title;
    title = this.get("content.title");
    return $(document).attr('title', "" + title + " - CollegeDesis Radio");
  }).observes('content')
});