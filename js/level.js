var Level = (function() {
  function Level(game, id) {
    var that = this;

    this.goodies = [];

    $.getJSON('/config/levels/level-' + id + '.json', function(level) {
      that.name = level.name;
      that.goodies = level.goodies;
    });
  }

  return Level;
})();
