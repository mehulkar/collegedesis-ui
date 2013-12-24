var ListView = Ember.ListView.extend({
  height: 500,
  rowHeight: 60,
  width: 331,
  itemViewClass: Ember.ListItemView.extend({templateName: "n/_index_row"}),

  didInsertElement: function() {
    var asideHeight   = $('aside').height();
    var footerHeight  = parseInt($('.footer').css('height'), 10);
    this.set('height', (asideHeight - footerHeight));
    this._super();
  },

  scrollToStories: function() {
    var pos = $('.bulletins-list .bulletin-wrapper:first').position().top;
    $('body').animate({scrollTop: pos });
  },
});

export default ListView;