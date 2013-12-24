var NStoryView = Ember.View.extend({
  classNames: ['bulletin'],

  actions: {
    jumpToComment: function() {
      $('.bulletin-comments textarea').focus();
    }
  },

  controllerContentDidChange: function() {
    $('body').scrollTop(0);
  }.observes('controller.content'),

});

export default NStoryView;