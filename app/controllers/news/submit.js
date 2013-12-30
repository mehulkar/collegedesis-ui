export default Ember.ObjectController.extend({
  needs: ['application'],

  currentUser: Em.computed.alias('controllers.application.currentUser'),

  showPreview: false,

  showingPreview: Em.computed.alias('showPreview'),

  actions: {
    submit: function() {

      if (!this.get('errors')) {

        this._assignAuthor();

        var self = this;
        return this.get('content').save().then(function() {
          self.createNewBulletin();
          return self.transitionToRoute('news.story', self.get('content'));

        });
      }
    }
  },

  createNewBulletin: function() {
    var bulletin = this.store.createRecord('bulletin');
    this.set('content', bulletin);
  },

  /*
    Properties and functions needed to assign
    an author for a polymorphic relationship.
  */

  possibleAuthors: function() {
    var arr, currentUser, orgs, userObject;
    arr = Em.A();
    currentUser = this.get('currentUser');

    if (currentUser) {
      userObject = Ember.Object.create({
        id: currentUser.get('id'),
        name: currentUser.get('fullName'),
        type: 'User'
      });

      arr.pushObject(userObject);

      orgs = currentUser.get('organizations');

      orgs.forEach(function(item) {
        var orgObject;
        if (item) {
          orgObject = Ember.Object.create({
            id: item.get('id'),
            name: item.get('name'),
            type: 'Organization'
          });
          return arr.pushObject(orgObject);
        }
      });
    }

    return arr;
  }.property('currentUser.organizations.@each.name'),

  assignedAuthor: null,

  _assignAuthor: function() {
    var author = this.get('assignedAuthor');

    this.set('content.authorId', author.get('id'));
    this.set('content.authorType', author.get('type'));
  },

  errors: function() {
    return !(this.get('assignedAuthor') && this.get('title') && this.get('url') && this.get('validUrl'));
  }.property('assignedAuthor', 'title', 'url', 'validUrl'),

  validUrl: function() {
    return this.get('urlIncludesProtocol') && !this.get('urlIsShortened');
  }.property('url'),

  urlIsShortened: function() { return false; }.property('url'),

  urlIncludesProtocol: function() {
    if (this.get('url') != null) {
      return this.get('url').match(/^https?:\/\/.+\..+/);
    }
  }.property('url'),
});