export default Ember.Route.extend({
  activate: function(controller) {
    return $(document).attr('title', 'CollegeDesis - About');
  },
});