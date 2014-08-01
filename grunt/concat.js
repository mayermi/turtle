module.exports = {
  options: {
    banner: ';(function() {\n  \'use strict\';\n\n',
    footer: '}).call(this);'
  },
  run: {
    files: {
      '<%= package.name %>.js': [
        'js/helper.js',
        'js/config/**/*.js',
        'js/models/**/*.js',
        'js/states/**/*.js',
        'js/config.js',
        'js/game.js'
      ]
    }
  }
};
