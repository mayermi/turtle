module.exports = {
  options: {
    livereload: true
  },
  grunt: {
    files: ['Gruntfile.js', 'grunt/**/*', 'package.json'],
    tasks: 'compile'
  },
  images: {
    files: 'img/**/*'
  },
  markup: {
    files: 'index.html'
  },
  script: {
    files: ['.jshintrc', 'js/**/*.js', 'js/**/*.json', 'js/**/*.xml'],
    tasks: 'js'
  }
};
