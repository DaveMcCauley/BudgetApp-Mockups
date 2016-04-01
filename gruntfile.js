
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


// AUTOPREFIXER =====================================================
// TODO: Replace with postcss. This is depricated by the maintainers
// TODO: Use better browser query.
// TODO: Enable source maps!!!
    autoprefixer: {

      options: {
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
      predev: {
        src: ['dev/assets/js/*.*',
              'dev/assets/css/*.*'
             ]
      },
      preprod: {
        src: 'prod/*'
      },
      postprod: {
        src: 'prod/assets/js/*/'
      }
    },


// CONCAT ===========================================================
// NOTE: Tasks concat:pages_dev and pages_prod are found below
//       they are dynamically assigned tasks.
    concat: {

      core_dev: {
        options: {
          sourceMap   : true,
        },
        files: {
          'dev/assets/js/core-pre.js' : ['node_modules/jquery/dist/jquery.js',
                                         'node_modules/moment/moment.js',
                                         'dev/assets/js/core-pre/**/*.js',
                                        ],
          'dev/assets/js/core-post.js' : [
                                         'dev/assets/js/core-post/**/*.js'
                                         ]
        },
      }

    },


// COPY =============================================================
// NOTE: For usage :: https://www.npmjs.com/package/grunt-contrib-copy
    copy: {
      build: {
        files: {
          // 'desitination': 'source'
        }
      },
      deps: {
        files: {
                'dev/assets/scss/vendor/normalize/_normalize.scss' : 'node_modules/normalize.css/normalize.css'
               }
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
          livereload: true,
        },
      },
      prod: {
        options: {
          port: 3000,
          hostname: 'localhost',
          bases:['./prod'],
          livereload: true

        },
      },

    },


// HTMLHINT =========================================================
// TODO: Consider https://www.npmjs.com/package/grunt-html-validation
//       at later time to ensure W3C compliance. For now, KISS.
// NOTE: Ruleset is https://github.com/yaniswang/HTMLHint/wiki/Rules
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
      prod: ['Gruntfile.js','dev/assets/js/*/*.js','!dev/assets/js/vendor/**/*.js'],
      dev: ['Gruntfile.js','dev/assets/js/*/*.js','!dev/assets/js/vendor/**/*.js']
    },


// NEWER ============================================================
// TODO: https://www.npmjs.com/package/grunt-newer


// NOTIFY ===========================================================
    notify : {

      notify_hooks: {
        options: {
          enabled: true,
          max_jshint_notifications: 5, // maximum number of notifications from jshint output
          title: "UngaBunga its BudgetApp!", // defaults to the name in package.json, or will use project directory's name
          success: true, // whether successful grunt executions should be notified automatically
          duration: 5 // the duration of notification in seconds, for `notify-send only
        }
      },

      fini: {
        options: {
          title: 'GRUNT*SNORT*',
          message: 'SUCCESS!\nGrunt has finished building BudgetApp!',
        }
      },

      reload: {
        options: {
          title: 'GRUNT*SNORT',
          message: 'Webpage reloaded via livereload',

        }
      },

      server: {
        options: {
          title:   'GRUNT*SNORT',
          message: 'Server started @localhost:3000\nPage loading...',
        }
      }
    },


// OPEN =============================================================
 open: {

    win: {
        path: 'http://localhost:3000/' + fileName,
        app: 'C:/Program Files (x86)/Firefox Developer Edition/firefox.exe'
    },
    mac: {
        path: 'http://localhost:3000/' + fileName,
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
          mangle: true,
          mangleProperties: false,
          preserveComments: 'all',
          sourceMap: true,
          sourceMapIncludeSources: true,
        },
        files: [{
            expand  : true,
            cwd     : 'dev/assets/js',
            src     : '*.js',
            dest    : 'dev/assets/js',
          }
        ]
      },

      prod: {
          options: {
            //banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n',
            compress: true,
            mangle: true,
            mangleProperties: false,
            preserveComments: 'some',
            sourceMap: false,
        },
        files: [{
            expand  : true,
            cwd     : 'dev/assets/js',
            src     : '*.js',
            dest    : 'prod/assets/js',
          }
        ]
      },

      vendor: { // libraries
        //files: [{
        //  expand  : true,                // allow dynamic build
        //  cwd     : 'dev/assets/lib',    // curernt working dir
        //  src     : '**/*.js',           // source files
        //  dest    : 'prod/assets/lib', 	 // destination
        // ext     : '.min.js',           // replace .js to .min.js
        //  extDot  : 'last'               // use the last dot to append to.
        //}],
        files: {
          'dev/assets/js/vendor/datetime-picker/datepicker.min.js': 'dev/assets/js/vendor/datetime-picker/datepicker.js'
        }
      }
    },


// WATCH ============================================================
    watch: {
      options: {
        livereload: true,
      },
      scripts: {
        files: 'dev/assets/js/**/*.js',
        tasks: ['jshint','concat:js','notify:reload']
      },
      sass: {
        files: ['dev/assets/scss/**/*.scss'],
        tasks: ['scsslint','sass','notify:reload']
      },
      html: {
        files: ['dev/**/*.html'],
        tasks: ['htmlhint','notify:reload']
      }

    } //<---<

  });



// Build a set of dynamic tasks to compile javascripts.
// See the wiki @https://github.com/DaveMcCauley/BudgetApp-Mockups/wiki/How-the-Javascript-files-are-compiled
  grunt.registerTask("concat:js", "Finds and prepares page-specifc js files for concatenation.", function() {

    // get all module directories
    grunt.file.expand("dev/assets/js/*/","!dev/assets/js/vendor/").forEach(function (dir) {

        // since the glob pattern returns a directory name,
        // with a trailing /, strip it.
        dir=dir.slice(0,-1);

        // get the module name from the directory name
        var dirName = dir.substr(dir.lastIndexOf('/')+1);

        // get the current concat object from initConfig
        var concat = grunt.config.get('concat') || {};
        var jsfiles ='';

        if(grunt.file.exists(dir + '/config.inc')===true) {
          jsfiles=grunt.file.read(dir + '/config.inc');
        }
        else {
          jsfiles= dir + '/**/*.js';
        }

        // create a subtask for each module, find all src files
        // and combine into a single js file per module
        concat[dirName] = {
            options: {sourceMap: true,},
            src:  jsfiles.split(','),
            dest: 'dev/assets/js/' + dirName + '.js'
        };

        // add module subtasks to the concat task in initConfig
        grunt.config.set('concat', concat);
        grunt.task.run('concat:' + dirName);
    });
  });




// CLI TASKS ==========================================================================
// 	dev-start-win		: build app into dev, start server+browser.For Windows.
//  dev-start-mac		: build app into dev, start server+browser. For Mac.
//	dev-build				: build app only.
//  prod-start-win  : build minified app into prod, start server+browswer. For Windows.
//  prod-start-mac  : build minified app into prod, start server+browser. For Mac.
//  prod-build      : build miniified app only.


  grunt.registerTask('dev-start-win',['dev-build',
	                                    'express:dev',
																			'open:win',
																			'watch',
                                      'notify:fini'
																		]);

  grunt.registerTask('dev-start-mac',['dev-build',
																		  'express:dev',
																			'open:mac',
																			'watch',
                                      'notify:fini'
																		]);

  grunt.registerTask('dev-build',['clean:predev',
																	'scsslint',
																	'sass:dev',
																	'csslint:dev_lax',
																	'autoprefixer:dev',
																	'jshint:dev',
																	'concat:js',
																	'htmlhint',
                                  'notify:fini'
																 ]);

  grunt.registerTask('prod-start-win',['express:prod',
																			 'open:win',
																			 'watch',
                                       'notify:fini'
																			]);

	grunt.registerTask('prod-start-mac',['express:prod',
																			 'open:mac',
																			 'watch',
                                       'notify:fini'
																			]);

  grunt.registerTask('prod-build',['clean:preprod',
																	 'uglify:vendor',
																	 'scsslint',
																	 'sass:prod',
																	 'csslint:prod_lax',
																	 'autoprefixer:prod',
																	 'cssmin:prod',
																	 'jshint:prod',
																	 'uglify:prod',
																	 'concat:js',
																	 'htmlhint',
																	 'htmlmin:prod',
																	 'imagemin',
																	 'clean:postprod',
                                   'notify:fini'
																	]);

};