export default Ember.ArrayController.extend({
  needs: ['application'],
  loading: false,
  selectedStates: Em.A(),
  searchParam: null,
  clearResults: function() {
    this.set('searchParam', null);
    this.set('selectedStates', Em.A());
    return this._resetQueries();
  },
  updateSelectedStates: function(selected) {
    this.set('selectedStates', selected);
    this._incrementQueries();
    return this.transitionToRoute('directory');
  },
  actions: {
    search: function() {
      return this._incrementQueries();
    }
  },
  numOfUniversities: (function() {
    if (this.get('selectedStates.length') || this.get('searchParam.length')) {
      return this.get('organizations').mapProperty('university_name').uniq().get('length');
    } else {
      return this.get('controllers.application.numOfUniversities');
    }
  }).property('selectedStates.length', 'organizations.@each.university_name', 'controllers.application.numOfUniversities'),
  numOfStates: (function() {
    if (this.get('selectedStates.length') === 0) {
      return this.get('controllers.application.numOfStates');
    } else {
      return this.get('selectedStates.length');
    }
  }).property('queries', 'controllers.application.numOfStates'),
  numOfOrganizations: (function() {
    if (this.get('selectedStates.length') || this.get('searchParam.length')) {
      return this.get('organizations.length');
    } else {
      return this.get('controllers.application.numOfOrganizations');
    }
  }).property('organizations.length', 'selectedStates.length', 'controllers.application.numOfOrganizations'),
  organizations: Em.A(),
  queries: 0,
  _incrementQueries: function() {
    var currentLength,
      _this = this;
    currentLength = this.get('selectedStates.length');
    this.makeAPICall();
    return window.setTimeout(function() {
      if (currentLength === _this.get('selectedStates.length')) {
        return _this.set('queries', _this.get('queries') + 1);
      }
    }, 200);
  },
  _resetQueries: function() {
    return this.set('queries', 0);
  },
  makeAPICall: function() {
    var query, states, statesString, url,
      _this = this;
    this.set('loading', true);
    states = this.get('selectedStates');
    statesString = states.join(',');
    query = this.get('searchParam');
    // TODO figure out how to configure this based on env
    url = window.ENV.apiURL + "/organizations/search?";
    if (states.get('length')) {
      url += "states=" + statesString;
    }
    if (query) {
      url += "&query=" + query;
    }
    return $.get(url).then(function(data) {
      var orgs;
      _this.get('store').pushPayload(data);
      orgs = data.organizations.map(function(org) {
        return _this.store.find('organization', org.id);
      });
      _this.set('organizations', orgs);
      return _this.set('loading', false);
    });
  }
});