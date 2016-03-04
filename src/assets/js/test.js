  /**
   * Utility function to register the build task to grunt.
   * @param  {[type]} mode  [the mode, either dev, or production]
   */
  var registerBuildTask = function(mode) {
    gunt.registerTask('build:' + mode,
      'Compiles all of the assets and copies them' +
      ' to the build directory',
      ['clean:build', 'copy', 'stylesheets:' + mode, 'scripts:' + mode]
    );
  };

      // these will be used later
    //"grunt-autoprefixer": "1.0.1",
    //"grunt-contrib-clean": "0.6.x",
    //"grunt-contrib-copy": "0.4.x",
    //"grunt-open": "0.2.3",
    //"grunt-contrib-concat": "0.5.0",
    //"grunt-contrib-htmlmin":"latest"