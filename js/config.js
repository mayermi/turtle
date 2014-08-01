var Config = (function() {
  function Config() {
    this.goodies = goodies;

    this.levels = {
      1: levelOne
    };

    this.colors = {
      gray: '#bcbcbc',
      lightBlue: '#0078f8',
      blue: '#0058f8',
      purple: '#6844fc',
      magenta: '#d800cc',
      red: '#e40058',

      green: '#00a800',
      lightGreen: '#00b800',
      lightYellow: '#d8F878'
    };
  }

  return Config;
})();
