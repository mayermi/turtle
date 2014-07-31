var Config = (function() {
  function Config() {
    var goody,
        that = this;

    this.goodies = {};

    $.getJSON('/config/goodies.json', function(goodies) {
      for (var i = 0, l = goodies.length; i < l; i += 1) {
        goody = goodies[i];
        that.goodies[goody.name] = goody;
      }

      console.log('read goodies');
    });
  }

  return Config;
})();
