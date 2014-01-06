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

  hostName: function() {
   var parser = document.createElement('a');
   parser.href = this.get('url');
   return parser.hostname;
  }.property('url'),

  humanizedCreatedAt: function() {
    return moment(this.get('createdAt')).fromNow();
  }.property("createdAt"),

  authorId: DS.attr('number'),
  authorType: DS.attr('string'),

  author: function() {
    var id = this.get('authorId');

    if (this.get('authorIsOrganization')) {
      return this.store.find('organization', id);
    } else {
      return this.store.find('user', id);
    }
  }.property('authorId', 'authorIsOrganization'),

  authorIsOrganization: Em.computed.equal('authorType', 'Organization'),
  authorIsUser: Em.computed.equal('authorType', 'User'),
});