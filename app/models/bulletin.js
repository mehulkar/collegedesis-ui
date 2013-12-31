export default DS.Model.extend({
  title: DS.attr('string'),
  body: DS.attr('string'),
  url: DS.attr('string'),
  createdAt: DS.attr('date'),
  errors: [],
  comments: DS.hasMany('comment'),
  user: DS.belongsTo('user'),
  slug: DS.attr('string'),
  score: DS.attr('number'),
  isLink: true,

  preview: function() {
    if (this.get('body')) {
      return "" + (this.get('body').slice(0, 20)) + "...";
    }
  }.property('body'),

  humanizedCreatedAt: function() {
    return moment(this.get('createdAt')).fromNow();
  }.property("createdAt"),

  authorId: DS.attr('number'),
  authorType: DS.attr('string'),

  author: function() {
    var id;
    id = this.get('authorId');
    if (this.get('authorIsOrganization')) {
      return this.store.find('organization', id);
    } else {
      return this.get('store').find('user', id);
    }
  }.property('authorId', 'authorIsOrganization'),

  authorIsOrganization: function() {
    return this.get('authorType') === 'Organization';
  }.property('authorType'),

  authorIsUser: function() {
    return this.get('authorType') === 'User';
  }.property('authorType'),
});