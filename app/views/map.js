export default Ember.View.extend({
  templateName: 'map',

  didInsertElement: function() {
    var id = $('#map').attr('id'),
        options = this.get('options');
    return $('#map').mapSvg(id, options);
  },

  regionClickHandler: function(event, map) {
    var stateElement = event.currentTarget,
        state = stateElement.getAttribute('id'),
        fill = stateElement.getAttribute('fill').toUpperCase();

    var selected = map.getSelected();
    this.get('controller').updateSelectedStates(selected);
  },

  // gets the selected states from the controller
  // and builds the object that mapSVG expects to define
  // preselected regions
  selectedRegions: function() {
    var regions = this.get('controller.selectedStates');
    var obj = {};
    regions.forEach(function(region) {
      obj[region] = {selected: true};
    });

    return obj;
  }.property('controller.selectedStates.@each'),

  options: function() {
    return {
      source: '/assets/img/usa.svg',
      cursor: 'pointer',
      loadingText: 'Loading Map...',
      multiSelect: true,
      responsive: true,
      colors: {
        background: 'rgba(255, 255, 255, 0)', // transparent
        base: '#4C4440',
        selected: "#A0CC6F",
        hover: "#7ab03e"
      },
      regions: this.get('selectedRegions'),
      onClick: this.regionClickHandler.bind(this),
    };
  }.property(),

});