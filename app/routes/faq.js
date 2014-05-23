export default Ember.Route.extend({
  activate: function() {
    return $(document).attr('title', 'CollegeDesis - FAQs');
  },
});