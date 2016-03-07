

// our wrapper function
module.exports = function(grunt) {
  // setup command line option to pass filename for the [prod|dev]-start-[mac|win]
  // by default it calls the file index.html. But calling, for example:
  // dev-start-win --fileName='ungabunga.html' you can redirect the target to
  // ungabunga.html, rather than just 'index.html'.
  var fileName = grunt.option('fileName') || 'index.html';

  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);

  // configure grunt
  grunt.initConfig({

   //pull config info from package.json
    pkg: grunt.file.readJSON('package.json'),
    // all configuration goes here



// AUTOPREFIXER =====================================================
// TODO: Replace with postcss. This is depricated by the maintainers
// TODO: Use better browser query.
// TODO: Enable source maps!!!
    autoprefixer: {

      options: {
        /*browsers: [
          'Android 2.3',
          'Android >= 4',
          'Chrome >= 20',
          'Firefox >= 24', // Firefox 24 is the latest ESR
          'Explorer >= 8',
          'iOS >= 6',
          'Opera >= 12',
          'Safari >= 6'
        ],*/
        /* my normal browser list */
        //browsers: ['last 5 versions', 'ie 8', 'ie 9', '> 1%'], <<--this is my
        /* bootstrap compliant browser list */
        browsers: [
          "Android 2.3",
          "Android >= 4",
          "Chrome >= 20",
          "Firefox >= 24",
          "Explorer >= 8",
          "iOS >= 6",
          "Opera >= 12",
          "Safari >= 6"
        ],
        map: {
          prev: 'dev/assets/css'
        },
        diff: true,
      },

      dev: {
        expand : true,
        cwd    : 'dev/assets/',
        src    : ['css/**/*.css','!css/normalize.css'],
        dest   : 'dev/assets/'
      },

      prod: {
        options: {
          diff: false
        },
        expand : true,
        cwd    : 'prod/assets/',
        src    : ['css/**/*.css','!css/normalize.css'],
        dest   : 'prod/assets/'
      }
    },
    // CLEAN ============================================================
    clean: {
      src: 'prod/**/*.*'
    },


// CONCAT ===========================================================
    concat: {
      devcss: {
        // if some scripts depend upon eachother,
        // make sure to list them here in order
        // rather than just using the '*' wildcard.
        // src: [BUILD_DIR_JS + '*.js'],
        // dest: BUILD_FILE_JS

        //for multiples...
        //files: {
        //  'dist/basic.js': ['src/main.js'],
        //  'dist/with_extras.js': ['src/main.js', 'src/extras.js'],
        //},
        options: {
          sourceMap   : true,
        },
        files: {
          'dev/assets/css/core.css' : ['dev/assets/css/scss/test.css',
                                       'dev/assets/css/scss/test2.css'
                                      ]
        }
      },

      dev: {
        options: {
          sourceMap   : true,
        },
        files: {
          'dev/assets/js/preload.js' : ['dev/assets/js/vendor/jquery/jquery.js',
                                        'dev/assets/js/vendor/bootstrap/bootstrap.js',
                                        'dev/assets/js/src/preload/**/*.js'
                                    ],
          'dev/assets/js/postload.js' : ['dev/assets/js/src/postload/**/*.js']
        },
      },
      prod: {
          options: {
            sourceMap   : false,
          },
        files: {
          /*'dev/assets/js/main.js' : ['dev/assets/js/src/*.js',
                                     'dev/assets/js/vendor/jquery/jquery.js',
                                     'dev/assets/js/vendor/bootstrap/bootstrap.js'
                                    ]*/
          // TODO: Add future vendor libraries as necesary
          'prod/assets/js/preload.js' : ['dev/assets/js/vendor/jquery/jquery.min.js',
                                         'dev/assets/js/vendor/bootstrap/bootstrap.min.js',
                                         'prod/assets/js/src/preload/**/*.min.js'
                                        ],
          'prod/assets/js/postload.js' : ['prod/assets/js/src/postload/**/*.min.js']
        }
      },
    },


// COPY =============================================================
    copy: {
      build: {
        // For usage :: https://www.npmjs.com/package/grunt-contrib-copy
        files: {
          // 'desitination': 'source'
        }
      },
      deps: {
        files: [
          {
            expand: true,
            cwd: 'node_modules/bootstrap-sass/assets/stylesheets',
            src: ['**/*.scss'],
            dest: 'dev/assets/scss/vendor/'
          },
          {
            expand: true,
            cwd: 'node_modules/bootstrap-sass/assets/javascripts',
            src: ['**/*.*'],
            dest: 'dev/assets/js/vendor/bootstrap/'
          },
          {
            expand: true,
            cwd: 'node_modules/bootstrap-sass/assets/fonts',
            src: ['**/*.*'],
            dest: 'dev/assets/fonts'
          },
          {
            expand: true,
            cwd: 'node_modules/jquery/dist',
            src: ['*.*'],
            dest: 'dev/assets/js/vendor/jquery/'
          },
        ]
      }
    },


// CSSLINT ==========================================================
    csslint: {

      dev_strict: {
        options: {
          import: false
        },
        src: ['dev/assets/css/*.css']
      },

      dev_lax : {
        options: {
          csslintrc: '.csslintrc'
        },
        src: ['dev/assets/css/*.css']
      },

      prod_strict: {
        options : {
          import : false
        },
        src : ['prod/assets/css/*.css']
      },

      prod_lax: {
        options: {
          csslintrc : '.csslintrc'
        },
        src: ['prod/assets/css/*.css']
      }
    },


// CSSMIN ===========================================================
// TOOD: Replace with POSTCSS?
    cssmin: {
      options: {
        banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
      },

      prod: { //minimze the conatenated file.
        //files: {
          //'public/assets/css/budgetapp.css' : 'public/assets/css/budgetapp.css' //< works!
        //}
        files: [{
            expand: true,
            cwd: 'prod/',
            src: ['**/*.css'],
            dest: 'prod/'
        }]
      },

      dev: {
        files: [{
          expand: true,
          cwd: 'dev/',
          src: ['**/*.css'],
          dest: 'dev/'
        }]
      }
    },


// EXPRESS SERVER ===================================================
    express: {
      dev: {
        options: {
          port: 3000,
          hostname: 'localhost',
          bases:['./dev'],
          livereload: true

        }
      },
      prod: {
        options: {
          port: 3000,
          hostname: 'localhost',
          bases:['./prod'],
          livereload: true
        }
      },

    },


// HTMLHINT =========================================================
//          TODO: Consider https://www.npmjs.com/package/grunt-html-validation
//                at later time to ensure W3C compliance. For now, KISS.
//          NOTE: Ruleset is https://github.com/yaniswang/HTMLHint/wiki/Rules
    htmlhint: {
      options: {
          htmlhintrc: '.htmlhintrc',
          force: false
      },
      all: {
        src: ['dev/**/*.html']
      }
    },



//HTMLMIN ===========================================================
    htmlmin: {

      prod: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: [{
            expand: true,
            cwd: 'dev/',
            src: ['**/*.html'],
            dest: 'prod/'
        }]
      },

      dev: {
        files: {
          // 'destination': 'source'
        }
      }
    },


// IMAGEMIN =========================================================
    imagemin: {
      dynamic: {
        options:  {
          optimizationLevel: 7,
          svgoPlugins: [{ removeViewBox: false}],
          style: 'expanded'

        },

        files: [{
            expand: true,
            cwd: 'dev/',
            src: ['**/*.{png,jpg,gif}'],
            dest: 'prod/'
        }]
      }
    },


// JSHINT ===========================================================
// TODO: Consider eslint in future?
    jshint: {
      options: {
        reporter: require('jshint-stylish')
      },
      // lint grundfile.js, everything in dev, except external libraries
      prod: ['Gruntfile.js','dev/src/**/*.js','!dev/assets/js/vendor/**/*.js'],
      dev: ['Gruntfile.js','dev/src/**/*.js','!dev/assets/js/vendor/**/*.js']
    },


// NEWER ============================================================
  // TODO: https://www.npmjs.com/package/grunt-newer ////////////////


// NOTIFY ===========================================================
    notify : {

      notify_hooks: {
        options: {
          enabled: true,
          max_jshint_notifications: 5, // maximum number of notifications from jshint output
          title: "UngaBunga its BudgetApp!", // defaults to the name in package.json, or will use project directory's name
          success: true, // whether successful grunt executions should be notified automatically
          duration: 3 // the duration of notification in seconds, for `notify-send only
        }
      },

      fini: {
        options: {
          title: 'GRUNT*SNORT*',  // optional
          message: 'Grunt has finished.', //required
        }
      },
    },


// OPEN =============================================================
 open: {
    dev: {
        path: 'http://localhost:3000/' + fileName,
        app: 'C:/Program Files (x86)/Firefox Developer Edition/firefox.exe'
    },
    prod: {
        path: fileName,
        app: 'C:/Program Files (x86)/Firefox Developer Edition/firefox.exe'
    },
    mac: {
        path: fileName,
        app: 'FirefoxDeveloperEdition'
    }

},


// SASS =============================================================
    sass: {

      dev: {
        options: {
          sourcemap: "auto",
          lineNumbers: true,
        },
        files: [{
          expand: true,
          cwd: 'dev/assets/scss',
          src: ['*.scss'],
          dest: 'dev/assets/css',
          ext: '.css'
        }]
      },

      prod: {
        options: {
            sourcemap: "none"
        },
        files: [{
          expand: true,
          cwd: 'dev/assets/scss',
          src: ['*.scss'],
          dest: 'prod/assets/css',
          ext: '.css'
        }]
      }
    },



// SCSSLINT =========================================================
   scsslint : {
        allFiles: ['dev/**/*.scss','!dev/assets/scss/vendor/**/*.scss'],
        options: {
          config: '.sass-lint.yml',
          colorizeOutput: true,
          force: true
        }
    },



// TARGETHTML =======================================================
    targethtml : {
      prod: {
        files: {
          // desitination : source
          'public/index.html' : 'dev/index.html'
          // add as necessary...
        }
      }
    },


// UGLIFY ===========================================================
// TODO: Enable source mapping!
    uglify: {
      options: {
        banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n',
        mangle: true,
        mangleProperties: true,
        preserveComments: false,
        sourceMap: true,
        sourceMapIncludeSources: true,
      },

      concsamp: { // in-house files
        files: {
          //TODO: assign wildcards?
          //'dist/js/magic.min.js':'dev/js/magic.js',
          //'dist/js/test.js':'dev/js/test.js'
          //'dist/js/budgetapp.min.js': ['dev/js/magic.js','dev/js/test.js']
          'prod/assets/core.js' : ['dev/**/*.js','!dev/assets/lib/**/*.js']
        }
      },

      dev: {
        options: {
          banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n',
          mangle: false,
          mangleProperties: false,
          preserveComments: 'all',
          sourceMap: true,
          sourceMapIncludeSources: true,
        },
        files: {
          'dev/assets/js/main.js' : ['dev/assets/js/src/*.js','dev/assets/js/lib/boostrap/bootstrap.js']
        }
      },

      prod: {
          options: {
            banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n',
            compress: true,
            mangle: true,
            mangleProperties: false,
            preserveComments: 'some',
            sourceMap: false,
        },
        files: [{
            expand  : true,
            cwd     : 'dev/assets/js/src/preload',
            src     : '**/*.js',
            dest    : 'prod/assets/js/src/preload',
            ext     : '.min.js',
            extDot  : 'last'
          },
          {
            expand  : true,
            cwd     : 'dev/assets/js/src/postload',
            src     : '**/*.js',
            dest    : 'prod/assets/js/src/postload',
            ext     : '.min.js',
            extDot  : 'last'
          }
        ]
      },

      libraries: { // libraries
        files: [{
          expand  : true,                // allow dynamic build
          cwd     : 'dev/assets/lib',    // curernt working dir
          src     : '**/*.js',           // source files
          dest    : 'prod/assets/lib', 	 // destination
          ext     : '.min.js',           // replace .js to .min.js
          extDot  : 'last'               // use the last dot to append to.
        }],
      }
    },


// WATCH ============================================================
    watch: {
      options: {
        livereload: true,
      },
      scripts: {
        files: 'dev/**/*.js',
        tasks: ['jshint','concat:dev']
      },
      sass: {
        options: {
          livereload: true
        },
        files: ['dev/**/*.scss'],
        tasks: ['scsslint','sass']
      },
      html: {
        files: ['dev/**/*.html'],
        tasks: ['htmlhint']
      }

    } //<---<

  });

  // create the tasks
  grunt.registerTask('dev-start-win',['express:dev','open:dev','watch']);
  grunt.registerTask('dev-start-mac',['express:dev','open:mac','watch']);

  grunt.registerTask('dev-build',['copy:deps','scsslint','sass','csslint:dev_lax','autoprefixer:dev','jshint:dev','concat:dev','htmlhint']);
  grunt.registerTask('prod-start-win',['express:prod','open:prod','watch']);
	grunt.registerTask('prod-start-mac',['express:prod','open:mac','watch']);
  grunt.registerTask('prod-build',['copy:deps','clean','scsslint','sass:prod','csslint:prod_lax','autoprefixer:prod','cssmin:prod','jshint:prod','uglify:prod','concat:prod', 'htmlhint','htmlmin:prod','imagemin']);

};