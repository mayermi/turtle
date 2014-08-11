module.exports = {
  build: {
    files: [
      {
        expand: true,
        src: [
          'index.html',
          'img/**',
          'style.css',
          'turtle.min.js',
          'bower_components/phaser-official/build/phaser.min.js',
          'bower_components/underscore/underscore.js',
          'fonts/**',
          'music/**'
        ],
        dest: 'dist/'
      }
    ]
  }
};
