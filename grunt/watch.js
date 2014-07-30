module.exports = {
  options: {
    livereload: true
  },
  grunt: {
    files: ['Gruntfile.js', 'grunt/**/*', 'package.json'],
    tasks: 'compile'
  },
  markup: {
    files: 'index.html'
  },
  script: {
    files: ['.jshintrc', 'js/**/*.js', 'js/**/*.json', 'js/**/*.xml'],
    tasks: 'js'
  }
};
