module.exports = {
  options: {
    banner: '/*! <%= package.name %> <%= package.version %> */\n',
    report: 'min'
  },
  js: {
    files: {
      '<%= package.name %>.min.js': '<%= package.name %>.js'
    }
  }
};
